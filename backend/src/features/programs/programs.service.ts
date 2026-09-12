import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../core/modules/prisma/prisma.service';
import { CreateProgramDto, CreateWeekDto } from './dto/create-program.dto';

@Injectable()
export class ProgramsService {
  constructor(private prisma: PrismaService) {}

  private mapWeeksToPrisma(weeks: CreateWeekDto[]) {
    return weeks.map((week) => ({
      workouts: {
        create: week.workouts.map((workout) => ({
          name: workout.name,
          day: workout.day,

          exercises: {
            create: workout.exercises.map((exercise) => ({
              name: exercise.name,
              unit: exercise.unit,
              order: exercise.order,

              sets: {
                create: exercise.sets,
              },
            })),
          },
        })),
      },
    }));
  }

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
            connect: {
              id: trainerProfile.id,
            },
          },
        },
      });

      const tempIdToRealIdsMap = new Map<string, string[]>();

      for (const weekDto of createProgramDto.weeks) {
        const week = await tx.programWeek.create({
          data: {
            trainingProgram: {
              connect: {
                id: program.id,
              },
            },
          },
        });

        for (const workoutDto of weekDto.workouts) {
          const workout = await tx.workout.create({
            data: {
              day: workoutDto.day,
              name: workoutDto.name,
              programWeek: {
                connect: {
                  id: week.id,
                },
              },
            },
          });

          for (const exDto of workoutDto.exercises) {
            const exercise = await tx.exercise.create({
              data: {
                name: exDto.name,
                unit: exDto.unit,
                order: exDto.order,
                sets: {
                  create: exDto.sets,
                },
                workout: {
                  connect: {
                    id: workout.id,
                  },
                },
              },
            });

            const existingIds = tempIdToRealIdsMap.get(exDto.tempId) || [];
            tempIdToRealIdsMap.set(exDto.tempId, [...existingIds, exercise.id]);
          }
        }
      }

      for (const targetDto of createProgramDto.targets) {
        const realExercisesIds =
          tempIdToRealIdsMap.get(targetDto.exerciseTempId) || [];

        const target = await tx.target.create({
          data: {
            name: targetDto.name,
            initialValue: targetDto.initialValue,
            currentValue: targetDto.initialValue,
            targetValue: targetDto.targetValue,
            exercises: {
              connect: realExercisesIds.map((id) => ({ id })),
            },
            trainingProgram: {
              connect: {
                id: program.id,
              },
            },
          },
        });
      }
    });
  }
}
