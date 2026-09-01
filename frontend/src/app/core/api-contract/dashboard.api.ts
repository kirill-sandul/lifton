import { WorkoutResponse } from '@core/api-contract/training.api';

export type WorkoutWidgetResponse = WorkoutResponse & {
  date: Date;
  isAllowedToStart: boolean;
};

export interface ClientDashboardRes {
  upcomingWorkoutWidget: WorkoutWidgetResponse;
}
