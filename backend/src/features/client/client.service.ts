import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../core/modules/prisma/prisma.service';
import {
  ClientDashboardResponse,
  CurrentProgram,
  WorkoutFull,
} from './client.models';
import { WorkoutDay } from '../../generated/prisma/enums';
import { WorkoutSessionRecordDto } from './dto/client.dto';

@Injectable()
export class ClientService {
  constructor(private readonly prisma: PrismaService) {}

  DAYS = [
    'SUNDAY',
    'MONDAY',
    'TUESDAY',
    'WEDNESDAY',
    'THURSDAY',
    'FRIDAY',
    'SATURDAY',
  ];

  DAYS_IDX = {
    [WorkoutDay.SUNDAY]: 0,
    [WorkoutDay.MONDAY]: 1,
    [WorkoutDay.TUESDAY]: 2,
    [WorkoutDay.WEDNESDAY]: 3,
    [WorkoutDay.THURSDAY]: 4,
    [WorkoutDay.FRIDAY]: 5,
    [WorkoutDay.SATURDAY]: 6,
  };

  private async getFullClient(clientId: string) {
    return this.prisma.user.findUnique({
      where: {
        id: clientId,
      },
      include: {
        clientProfile: {
          include: {
            currentProgram: {
              include: {
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
        },
      },
    });
  }

  private async getCurrentProgram(clientId: string) {
    const clientUser = await this.getFullClient(clientId);

    if (
      !clientUser ||
      !clientUser.clientProfile ||
      !clientUser.clientProfile.currentProgram
    )
      throw new NotFoundException();

    return clientUser.clientProfile.currentProgram;
  }

  private getCorrespondingWeekIdx(daysPassed: number) {
    if (daysPassed <= 7) return 0;
    else if (daysPassed <= 14) return 1;
    else if (daysPassed >= 21) return 2;
    else if (daysPassed <= 28) return 4;
    else return -1;
  }

  private getWorkoutByWeekDay(
    program: CurrentProgram,
    weekIndex: number,
  ): WorkoutFull[] {
    return program.weeks[weekIndex].workouts.filter((workout) => {
      const currentWeekDay = this.DAYS[new Date().getDay()];

      return workout.day === currentWeekDay;
    });
  }

  private getClosestWorkout(
    program: CurrentProgram,
    daysPassed: number,
  ): WorkoutFull {
    const currentDayIndex = new Date().getDay();

    const closest = program.weeks[
      this.getCorrespondingWeekIdx(daysPassed)
    ].workouts
      .filter((w) => this.DAYS_IDX[w.day] >= currentDayIndex)
      .sort((a, b) => this.DAYS_IDX[a.day] - this.DAYS_IDX[b.day]);

    if (closest.length === 0) {
      const nextWeekIdx = this.getCorrespondingWeekIdx(daysPassed) + 1;

      const nextWeekWorkout = program.weeks[nextWeekIdx].workouts
        .filter((w) => this.DAYS_IDX[w.day] >= currentDayIndex)
        .sort((a, b) => this.DAYS_IDX[a.day] - this.DAYS_IDX[b.day])[0];

      if (nextWeekWorkout) return nextWeekWorkout;
      throw new NotFoundException();
    }

    if (closest[0]) return closest[0];
    else throw new NotFoundException();
  }

  private mapExerciseRecordToPrisma(workoutRecord: WorkoutSessionRecordDto) {
    return {
      create: workoutRecord.exercises.map((ex) => {
        return {
          name: ex.name,
          unit: ex.unit,
          order: ex.order,
          sets: {
            create: ex.sets,
          },
        };
      }),
    };
  }

  async getTodaysWorkout(clientId: string): Promise<WorkoutFull | null> {
    const currentProgram = await this.getCurrentProgram(clientId);

    const startTimeDiff =
      (currentProgram.startDate.getTime() - Date.now()) / 1000 / 60 / 60 / 24;

    const endTimeDiff =
      (currentProgram.endDate.getTime() - Date.now()) / 1000 / 60 / 60 / 24;

    // program not started
    if (startTimeDiff > 0) throw new ForbiddenException();
    // program ended
    else if (endTimeDiff <= 0) throw new ForbiddenException();

    const daysPassedFromStart =
      (Date.now() - currentProgram.startDate.getTime()) / 1000 / 60 / 60 / 24;

    const finalRes = this.getWorkoutByWeekDay(
      currentProgram,
      this.getCorrespondingWeekIdx(daysPassedFromStart),
    );

    if (finalRes.length > 0) {
      const foundWorkout = finalRes[0];
      const alreadyDone = await this.prisma.workoutRecord.findFirst({
        where: {
          originalWorkoutId: foundWorkout.id,
        },
      });

      if (alreadyDone) throw new ForbiddenException();

      return foundWorkout;
    } else throw new ForbiddenException();
  }

  async getUpcomingWorkout(clientId: string) {
    const currentProgram = await this.getCurrentProgram(clientId);

    const startTimeDiff =
      (currentProgram.startDate.getTime() - Date.now()) / 1000 / 60 / 60 / 24;

    const endTimeDiff =
      (currentProgram.endDate.getTime() - Date.now()) / 1000 / 60 / 60 / 24;

    // program not started
    if (startTimeDiff > 0) throw new ForbiddenException();
    // program ended
    else if (endTimeDiff <= 0) throw new ForbiddenException();

    const daysPassedFromStart =
      (Date.now() - currentProgram.startDate.getTime()) / 1000 / 60 / 60 / 24;

    return this.getClosestWorkout(currentProgram, daysPassedFromStart);
  }

  async getDashboard(clientId: string): Promise<ClientDashboardResponse> {
    const upcomingWorkoutWidget = await this.getUpcomingWorkout(clientId);

    return {
      upcomingWorkoutWidget,
    };
  }

  async createWorkoutRecord(
    clientId: string,
    workoutRecord: WorkoutSessionRecordDto,
  ) {
    const clientProfile = await this.prisma.clientProfile.findUnique({
      where: {
        userId: clientId,
      },
    });

    if (!clientProfile) throw new NotFoundException();

    return this.prisma.workoutRecord.create({
      data: {
        name: workoutRecord.name,
        day: workoutRecord.day,
        durationSec: workoutRecord.durationSec,
        exercises: this.mapExerciseRecordToPrisma(workoutRecord),
        doneByUserId: clientProfile.id,
        originalWorkoutId: workoutRecord.originalWorkoutId,
      },
    });
  }
}
