import { Prisma } from '../../generated/prisma/client';
import { WorkoutWithDate } from '../../core/models/global.models';
import { ProgressChartWidgetRes } from '../client/client.models';

export type TrainerProfileFull = Prisma.TrainerProfileGetPayload<{
  include: {
    clients: {
      include: {
        user: true;
      };
    };
    programs: {
      include: {
        clientProfiles: true;
      };
    };
  };
}>;

export type TrainerTodo = Prisma.TrainerTodoListGetPayload<{
  include: {
    items: true;
  };
}>;

export interface AdherenceWidgetResponse {
  percentage: number;
  daysRange: {
    start: Date;
    end: Date;
  };
}

export interface ClientSchedule {
  id: string;
  username: string;
  pfpUrl: string | null;
  fullName: string;
  workouts: WorkoutWithDate[];
}

export interface ClientWorkoutOnDay {
  id: string;
  username: string;
  pfpUrl: string | null;
  fullName: string;
  workout: WorkoutWithDate;
}

export interface ScheduleWidgetResponse {
  [date: string]: ClientWorkoutOnDay[];
}

export type AllClientProgressResponse = ProgressChartWidgetRes[];

export interface TrainerDashboardResponse {
  adherenceRateWidget: AdherenceWidgetResponse | null;
  completedWorkoutsWidget: number | null;
  activeProgramsWidget: number | null;
  scheduleWidget: ScheduleWidgetResponse | null;
  todoWidget: TrainerTodo | null;
  allClientsProgressWidget: AllClientProgressResponse | null;
}
