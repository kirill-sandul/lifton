import { WorkoutResponse } from '@core/api-contract/training.api';

export type WorkoutWidgetResponse = WorkoutResponse & {
  date: Date;
  isAllowedToStart: boolean;
};

export type WorkoutWithDate = WorkoutResponse & {
  date: string;
};
export type ScheduleWidgetResponse = WorkoutWithDate[];

export interface ClientDashboardRes {
  upcomingWorkoutWidget: WorkoutWidgetResponse;
  scheduleWidget: ScheduleWidgetResponse;
}
