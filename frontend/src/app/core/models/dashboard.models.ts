import { WorkoutResponse } from '@core/api-contract/training.api';

export interface ClientDashboardRes {
  upcomingWorkoutWidget: WorkoutResponse;
}

export interface ClientDashboard {
  upcomingWorkoutWidget: WorkoutResponse;
}
