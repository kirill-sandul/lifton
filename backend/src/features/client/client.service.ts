import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../core/modules/prisma/prisma.service';
import {
  ClientDashboardResponse,
  CurrentProgram,
  WorkoutFull,
} from './dto/client.dto';
import { WorkoutDay } from '../../generated/prisma/enums';

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
    const jsDay = new Date().getDay();
    const currentDayIndex = jsDay === 0 ? 6 : jsDay - 1;

    const closest = program.weeks[
      this.getCorrespondingWeekIdx(daysPassed)
    ].workouts
      .filter((w) => this.DAYS_IDX[w.day] >= currentDayIndex)
      .sort((a, b) => this.DAYS_IDX[a.day] - this.DAYS_IDX[b.day]);

    if (closest.length === 0) {
      const nextWeekIdx = this.getCorrespondingWeekIdx(daysPassed) + 1;

      return program.weeks[nextWeekIdx].workouts
        .filter((w) => this.DAYS_IDX[w.day] >= currentDayIndex)
        .sort((a, b) => this.DAYS_IDX[a.day] - this.DAYS_IDX[b.day])[0];
    }

    return closest[0];
  }

  private async getTodaysWorkout(
    clientId: string,
  ): Promise<WorkoutFull | null> {
    const currentProgram = await this.getCurrentProgram(clientId);

    const startTimeDiff =
      (currentProgram.startDate.getTime() - Date.now()) / 1000 / 60 / 60 / 24;

    const endTimeDiff =
      (currentProgram.endDate.getTime() - Date.now()) / 1000 / 60 / 60 / 24;

    // program not started
    if (startTimeDiff > 0) {
      return null;
    }
    // program ended
    else if (endTimeDiff <= 0) {
      return null;
    }

    const daysPassedFromStart =
      (Date.now() - currentProgram.startDate.getTime()) / 1000 / 60 / 60 / 24;

    const finalRes = this.getWorkoutByWeekDay(
      currentProgram,
      this.getCorrespondingWeekIdx(daysPassedFromStart),
    );

    return finalRes.length > 0 ? finalRes[0] : null;
  }

  async getUpcomingWorkout(clientId: string) {
    const currentProgram = await this.getCurrentProgram(clientId);

    const startTimeDiff =
      (currentProgram.startDate.getTime() - Date.now()) / 1000 / 60 / 60 / 24;

    const endTimeDiff =
      (currentProgram.endDate.getTime() - Date.now()) / 1000 / 60 / 60 / 24;

    // program not started
    if (startTimeDiff > 0) {
      return null;
    }
    // program ended
    else if (endTimeDiff <= 0) {
      return null;
    }

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
}
