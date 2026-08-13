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
    const { name, cycle, startDate, endDate, weeks, targets } =
      createProgramDto;

    const trainerProfile = await this.prisma.trainerProfile.findUnique({
      where: { userId: trainerId },
    });

    if (!trainerProfile)
      throw new NotFoundException('No trainer profile found when creating');

    return this.prisma.trainingProgram.create({
      data: {
        name,
        cycle,
        startDate,
        endDate,

        trainerAuthorId: trainerProfile.id,

        targets: {
          create: targets,
        },

        weeks: {
          create: this.mapWeeksToPrisma(weeks),
        },
      },
    });
  }
}
