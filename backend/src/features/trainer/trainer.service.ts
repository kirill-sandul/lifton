import { Injectable, NotFoundException } from '@nestjs/common';
import { eachDayOfInterval, isSameDay, subMonths, subWeeks } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { PrismaService } from '../../core/modules/prisma/prisma.service';
import {
  AdherenceWidgetResponse,
  AllClientProgressResponse,
  ClientSchedule,
  ClientWorkoutOnDay,
  ScheduleWidgetResponse,
  TrainerDashboardResponse,
  TrainerProfileFull,
} from './trainer.models';
import { ClientService } from '../client/client.service';
import { TodoListItem, TodoListItemUpdate } from './dto/trainer.dto';

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

  // DASHBOARD METHODS

  getActivePrograms(trainerProfile: TrainerProfileFull): number {
    const totalActivePrograms = trainerProfile.programs.reduce((acc, cur) => {
      if (cur.clientProfiles.length > 0) return acc + 1;
      return acc;
    }, 0);

    return totalActivePrograms;
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
  ): Promise<AllClientProgressResponse> {
    const promises = trainerProfile.clients.map(async (client) => {
      const clientProgress = await this.clientService.getProgressChart(
        client.userId,
      );

      return {
        clientData: {
          id: client.id,
          pfpUrl: client.user.pfpUrl,
          fullName: client.user.fullName,
        },
        ...clientProgress,
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
      completedWorkoutsResult,
      scheduleResult,
      todoListResult,
      allClientsProgressResult,
    ] = await Promise.allSettled([
      this.getCompletedWorkoutsAndAdherence(trainerProfile, tz),
      this.getSchedule(trainerProfile, tz),
      this.getTodoList(trainerId),
      this.getAllClientsProgress(trainerProfile),
    ]);

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
