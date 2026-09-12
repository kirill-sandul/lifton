import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../core/modules/prisma/prisma.service';
import { CreateProgramDto } from './dto/create-program.dto';

@Injectable()
export class ProgramsService {
  constructor(private prisma: PrismaService) {}

  async getTrainerPrograms(trainerUserId: string) {
    const trainer = await this.prisma.trainerProfile.findUnique({
      where: { userId: trainerUserId },
      include: {
        programs: {
          include: {
            clientProfiles: {
              include: {
                user: true,
              },
            },
            weeks: {
              include: {
                workouts: {
                  include: {
                    exercises: {
                      include: {
                        sets: true,
                      },
                    },
                  },
                },
              },
            },
            targets: true,
          },
        },
      },
    });

    if (!trainer) throw new NotFoundException();

    return trainer.programs;
  }

  async assignClient(
    programId: string,
    clientId: string,
    trainerUserId: string,
  ) {
    await this.prisma.trainingProgram.update({
      where: { id: programId },
      data: {
        clientProfiles: {
          connect: {
            id: clientId,
          },
        },
      },
    });

    return this.getTrainerPrograms(trainerUserId);
  }

  async removeClient(
    programId: string,
    clientId: string,
    trainerUserId: string,
  ) {
    await this.prisma.trainingProgram.update({
      where: { id: programId },
      data: {
        clientProfiles: {
          disconnect: {
            id: clientId,
          },
        },
      },
    });

    return this.getTrainerPrograms(trainerUserId);
  }

  async createProgram(trainerId: string, createProgramDto: CreateProgramDto) {
    const { name, cycle, startDate, endDate } = createProgramDto;

    const trainerProfile = await this.prisma.trainerProfile.findUnique({
      where: { userId: trainerId },
    });

    if (!trainerProfile)
      throw new NotFoundException('No trainer profile found when creating');

    return await this.prisma.$transaction(async (tx) => {
      const program = await tx.trainingProgram.create({
        data: {
          name,
          cycle,
          startDate,
          endDate,
          trainerAuthor: {
            connect: { id: trainerProfile.id },
          },
          weeks: {
            create: createProgramDto.weeks.map((weekDto) => ({
              workouts: {
                create: weekDto.workouts.map((workoutDto) => ({
                  name: workoutDto.name,
                  day: workoutDto.day,
                  exercises: {
                    create: workoutDto.exercises.map((exDto) => ({
                      name: exDto.name,
                      unit: exDto.unit,
                      order: exDto.order,
                      sets: {
                        create: exDto.sets.map((set) => ({
                          index: set.index,
                          reps: set.reps,
                          targetValue: set.targetValue,
                        })),
                      },
                    })),
                  },
                })),
              },
            })),
          },
        },
        include: {
          weeks: {
            include: {
              workouts: {
                include: {
                  exercises: true,
                },
              },
            },
          },
        },
      });

      // building ids map from dto and from direct access to created exercise using indexes of forEach
      const tempIdToRealIdsMap = new Map<string, string[]>();

      createProgramDto.weeks.forEach((weekDto, weekIdx) => {
        weekDto.workouts.forEach((workoutDto, workoutIdx) => {
          workoutDto.exercises.forEach((exDto, exIdx) => {
            if (exDto.tempId) {
              const createdExercise =
                program.weeks[weekIdx].workouts[workoutIdx].exercises[exIdx];

              if (!createdExercise) return;

              const existingIds = tempIdToRealIdsMap.get(exDto.tempId) || [];
              tempIdToRealIdsMap.set(exDto.tempId, [
                ...existingIds,
                createdExercise.id,
              ]);
            }
          });
        });
      });

      for (const targetDto of createProgramDto.targets) {
        const realExercisesIds = targetDto.exerciseTempId
          ? tempIdToRealIdsMap.get(targetDto.exerciseTempId) || []
          : [];

        const target = await tx.target.create({
          data: {
            name: targetDto.name,
            initialValue: targetDto.initialValue,
            currentValue: targetDto.initialValue,
            targetValue: targetDto.targetValue,
            trainingProgram: {
              connect: {
                id: program.id,
              },
            },
            exercises: {
              connect: realExercisesIds.map((id) => ({ id })),
            },
          },
        });
      }
    });
  }
}
