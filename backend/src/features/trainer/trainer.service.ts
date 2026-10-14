import { Injectable, NotFoundException } from '@nestjs/common';
import { eachDayOfInterval, isSameDay, subMonths, subWeeks } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { PrismaService } from '../../core/modules/prisma/prisma.service';
import {
  AdherenceWidgetResponse,
  AllClientProgressResponse,
  AverageClientsProgressResponse,
  ClientSchedule,
  ClientWorkoutOnDay,
  ScheduleWidgetResponse,
  TrainerDashboardResponse,
  TrainerProfileFull,
} from './trainer.models';
import { TodoListItem, TodoListItemUpdate } from './dto/trainer.dto';
import { ClientService } from '../client/client.service';
import { ProgressChartWidgetRes } from '../client/client.models';

@Injectable()
export class TrainerService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly clientService: ClientService,
  ) {}

  // HELPER METHOD

  async getTrainerProfile(trainerId: string): Promise<TrainerProfileFull> {
    const trainerUser = await this.prisma.user.findUnique({
      where: { id: trainerId },
      include: {
        trainerProfile: {
          include: {
            clients: {
              include: {
                user: true,
              },
            },
            programs: {
              include: {
                clientProfiles: true,
              },
            },
          },
        },
      },
    });

    if (!trainerUser || !trainerUser.trainerProfile)
      throw new NotFoundException('No trainer profile found');

    return trainerUser.trainerProfile;
  }

  private analyzeClientProgressVector(clientProgress: ProgressChartWidgetRes) {
    const avgStepProgressPerExercise = clientProgress.chartData.map(
      (exData) => {
        if (exData.values.length < 2) return 0;
        const first = exData.values[0];
        const last = exData.values[exData.values.length - 1];
        const steps = exData.values.length - 1;

        // Formula: Compound Annual Growth Rate
        const averageFactor = Math.pow(last / first, 1 / steps) - 1;

        return averageFactor * 100;
      },
    );

    const progressPercentageAllExercises = avgStepProgressPerExercise.reduce(
      (acc, cur) => acc + cur,
      0,
    );

    if (!progressPercentageAllExercises) return 0;

    return progressPercentageAllExercises / clientProgress.chartData.length;
  }

  // DASHBOARD METHODS

  getActivePrograms(trainerProfile: TrainerProfileFull): number {
    const totalActivePrograms = trainerProfile.programs.reduce((acc, cur) => {
      if (cur.clientProfiles.length > 0) return acc + 1;
      return acc;
    }, 0);

    return totalActivePrograms;
  }

  async getAvgClientsProgress(
    trainerProfile: TrainerProfileFull,
    tz: string,
  ): Promise<AverageClientsProgressResponse> {
    let avgClientsProgressPerc = 0;

    const todayInUserTz = toZonedTime(new Date(), tz);
    const daysRangeStart = subMonths(todayInUserTz, 1);
    const daysRangeEnd = todayInUserTz;

    const promises = trainerProfile.clients.map(async (client) => {
      const clientProgress = await this.clientService.getProgressChart(
        client.userId,
        tz,
        undefined,
        daysRangeEnd,
        daysRangeStart,
      );

      const clientAvgProgressPerc =
        this.analyzeClientProgressVector(clientProgress);

      avgClientsProgressPerc += clientAvgProgressPerc;
    });

    await Promise.all(promises);

    avgClientsProgressPerc = Math.floor(
      avgClientsProgressPerc / trainerProfile.clients.length,
    );

    return {
      percentage: avgClientsProgressPerc,
      daysRange: {
        start: daysRangeStart,
        end: daysRangeEnd,
      },
    };
  }

  async getCompletedWorkoutsAndAdherence(
    trainerProfile: TrainerProfileFull,
    tz: string,
  ): Promise<{
    adherenceRate: AdherenceWidgetResponse;
    recordsLastWeekAllClients: number;
  }> {
    const todayInUserTz = toZonedTime(new Date(), tz);

    let recordsLastWeekAllClients: number = 0;

    const adherenceRates: number[] = [];
    const adherenceStartDate = subMonths(todayInUserTz, 1); // one month back

    const recordsMap = trainerProfile.clients.map(async (client) => {
      const records = await this.prisma.workoutRecord.findMany({
        where: {
          doneByClientId: client.id,
        },
      });

      const clientProgramCompletionInfo =
        await this.clientService.getClientAdherenceRate(
          client.userId,
          tz,
          adherenceStartDate,
          todayInUserTz,
        );

      const clientAdherenceRate =
        (clientProgramCompletionInfo.workoutsCompleted * 100) /
        clientProgramCompletionInfo.totalWorkoutsPlanned;

      adherenceRates.push(Math.floor(clientAdherenceRate));

      const recordsLastWeek = records.filter((record) => {
        const lastWeekRange = eachDayOfInterval({
          start: subWeeks(todayInUserTz, 1),
          end: todayInUserTz,
        });

        let inRange: boolean = false;

        lastWeekRange.forEach((day) => {
          if (isSameDay(record.createdAt, day)) inRange = true;
        });

        return inRange;
      });

      // const recordsLastMonth = records.filter((record) => {
      //   const lastMonthRange = eachDayOfInterval({
      //     start: adherenceStartDate,
      //     end: todayInUserTz,
      //   });
      //
      //   let inRange: boolean = false;
      //
      //   lastMonthRange.forEach((day) => {
      //     if (isSameDay(record.createdAt, day)) {
      //       inRange = true;
      //
      //       if (!record.skipped) recordsNotSkippedLastMonth++;
      //     }
      //   });
      //
      //   return inRange;
      // });

      recordsLastWeekAllClients += recordsLastWeek.length;

      // if (recordsLastMonth.length > 0) {
      //   adherenceRate =
      //     (recordsNotSkippedLastMonth * 100) / recordsLastMonth.length;
      // }
    });

    await Promise.all(recordsMap);

    const adherenceRate =
      adherenceRates.reduce((cur, acc) => cur + acc, 0) /
      trainerProfile.clients.length;

    return {
      adherenceRate: {
        percentage: Math.ceil(adherenceRate),
        daysRange: {
          start: adherenceStartDate,
          end: todayInUserTz,
        },
      },
      recordsLastWeekAllClients,
    };
  }

  async getSchedule(
    trainerProfile: TrainerProfileFull,
    tz: string,
  ): Promise<ScheduleWidgetResponse> {
    const schedulesMap = trainerProfile.clients
      .filter((client) => !!client.trainingProgramId)
      .map(async (client): Promise<ClientSchedule> => {
        const clientSchedule = await this.clientService.getSchedule(
          client.userId,
          tz,
        );

        return {
          id: client.id,
          username: client.user.username,
          pfpUrl: client.user.pfpUrl,
          fullName: client.user.fullName,
          workouts: clientSchedule.map((w) => ({
            ...w,
          })),
        };
      });

    const unstructuredSchedule = await Promise.all(schedulesMap);

    const structuredScheduleMap = new Map<string, ClientWorkoutOnDay[]>();

    unstructuredSchedule.forEach((clientSchedule) => {
      clientSchedule.workouts.forEach((workout) => {
        const dateKey = workout.date.toISOString();

        const prevWorkouts = structuredScheduleMap.get(dateKey);

        structuredScheduleMap.set(dateKey, [
          ...(prevWorkouts ?? []),
          {
            id: clientSchedule.id,
            username: clientSchedule.username,
            pfpUrl: clientSchedule.pfpUrl,
            fullName: clientSchedule.fullName,
            workout,
          },
        ]);
      });
    });

    const structuredSchedule: ScheduleWidgetResponse = Object.assign(
      {},
      ...Array.from(structuredScheduleMap).map(([key, value]) => ({
        [key]: value,
      })),
    );

    return structuredSchedule;
  }

  async getTodoList(trainerId: string) {
    const trainerProfile = await this.getTrainerProfile(trainerId);

    return this.prisma.trainerTodoList.findUnique({
      where: {
        trainerProfileId: trainerProfile.id,
      },
      include: {
        items: true,
      },
    });
  }

  async getAllClientsProgress(
    trainerProfile: TrainerProfileFull,
    tz: string,
  ): Promise<AllClientProgressResponse> {
    const promises = trainerProfile.clients.map(async (client) => {
      const clientProgress = await this.clientService.getProgressChart(
        client.userId,
        tz,
      );

      const clientAvgProgressPerc =
        this.analyzeClientProgressVector(clientProgress);

      return {
        clientData: {
          id: client.id,
          pfpUrl: client.user.pfpUrl,
          fullName: client.user.fullName,
        },
        ...clientProgress,
        analytics: {
          avgClientProgress: clientAvgProgressPerc,
        },
      };
    });

    return await Promise.all(promises);
  }

  async getDashboard(
    trainerId: string,
    tz: string,
  ): Promise<TrainerDashboardResponse> {
    const trainerProfile = await this.getTrainerProfile(trainerId);

    const [
      avgClientsProgressResult,
      completedWorkoutsResult,
      scheduleResult,
      todoListResult,
      allClientsProgressResult,
    ] = await Promise.allSettled([
      this.getAvgClientsProgress(trainerProfile, tz),
      this.getCompletedWorkoutsAndAdherence(trainerProfile, tz),
      this.getSchedule(trainerProfile, tz),
      this.getTodoList(trainerId),
      this.getAllClientsProgress(trainerProfile, tz),
    ]);

    const avgClientsProgressWidget =
      avgClientsProgressResult.status === 'fulfilled'
        ? avgClientsProgressResult.value
        : null;

    const completedWorkoutsWidget =
      completedWorkoutsResult.status === 'fulfilled'
        ? completedWorkoutsResult.value.recordsLastWeekAllClients
        : null;

    const adherenceRateWidget =
      completedWorkoutsResult.status === 'fulfilled'
        ? completedWorkoutsResult.value.adherenceRate
        : null;

    const scheduleWidget =
      scheduleResult.status === 'fulfilled' ? scheduleResult.value : null;

    const todoListWidget =
      todoListResult.status === 'fulfilled' ? todoListResult.value : null;

    const allClientsProgressWidget =
      allClientsProgressResult.status === 'fulfilled'
        ? allClientsProgressResult.value
        : null;

    return {
      avgClientsProgressWidget,
      completedWorkoutsWidget,
      adherenceRateWidget,
      scheduleWidget,
      allClientsProgressWidget,
      todoWidget: todoListWidget,
      activeProgramsWidget: this.getActivePrograms(trainerProfile),
    };
  }

  // MUTATIONS
  async addTodoTask(trainerId: string, dto: TodoListItem) {
    const trainerProfile = await this.getTrainerProfile(trainerId);

    await this.prisma.trainerTodoList.upsert({
      where: {
        trainerProfileId: trainerProfile.id,
      },
      create: {
        trainerProfile: {
          connect: {
            id: trainerProfile.id,
          },
        },
        items: {
          create: {
            id: dto.taskId,
            content: dto.content,
            completed: false,
          },
        },
      },
      update: {
        items: {
          create: {
            id: dto.taskId,
            content: dto.content,
            completed: false,
          },
        },
      },
    });

    return this.prisma.trainerTodoList.findUnique({
      where: {
        trainerProfileId: trainerProfile.id,
      },
      include: {
        items: true,
      },
    });
  }

  async editTodoTask(
    trainerId: string,
    taskId: string,
    dto: TodoListItemUpdate,
  ) {
    const trainerProfile = await this.getTrainerProfile(trainerId);

    return this.prisma.trainerTodoItem.update({
      where: {
        id: taskId,
        AND: {
          trainerTodoList: {
            trainerProfileId: trainerProfile.id,
          },
        },
      },
      data: {
        completed: dto.completed,
      },
    });
  }

  async removeTodoTask(trainerId: string, taskId: string) {
    const trainerProfile = await this.getTrainerProfile(trainerId);

    return this.prisma.trainerTodoItem.delete({
      where: {
        id: taskId,
        AND: {
          trainerTodoList: {
            trainerProfileId: trainerProfile.id,
          },
        },
      },
    });
  }
}
