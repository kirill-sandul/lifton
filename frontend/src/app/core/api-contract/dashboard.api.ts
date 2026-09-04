import { TargetResponse, WorkoutResponse } from '@core/api-contract/training.api';

export type WorkoutWidgetResponse = WorkoutResponse & {
  date: Date;
  isAllowedToStart: boolean;
};

export type WorkoutWithDate = WorkoutResponse & {
  date: string;
};
export type ScheduleWidgetResponse = WorkoutWithDate[];

export interface ProgramCompletionWidgetResponse {
  workoutsCompleted: number;
  workoutsLeft: number;
  workoutsSkipped: number;
  completionPercentage: number;
  weeksPassed: number;
  daysOffset: number;
  weeksTotal: number;
}

export interface StreakWidgetResponse {
  streakWeeks: number;
  workoutsSkipped: number;
}

export interface TargetsWidgetResponse {
  targets: TargetResponse[];
}

export interface ClientDashboardRes {
  upcomingWorkoutWidget: WorkoutWidgetResponse | null;
  scheduleWidget: ScheduleWidgetResponse | null;
  completionWidget: ProgramCompletionWidgetResponse | null;
  streakWidget: StreakWidgetResponse | null;
  targetsWidget: TargetsWidgetResponse | null;
}
