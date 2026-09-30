import { TargetResponse, WorkoutResponse } from '@core/api-contract/training.api';
import { ExerciseUnit } from '@core/models/training.models';

// Client
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

export interface ProgressChartDataset {
  exerciseName: string;
  exerciseUnit: ExerciseUnit;
  values: number[];
  labels: string[];
}

export interface ProgressChartWidgetResponse {
  chartData: ProgressChartDataset[];
}

export interface ClientDashboardRes {
  upcomingWorkoutWidget: WorkoutWidgetResponse | null;
  scheduleWidget: ScheduleWidgetResponse | null;
  completionWidget: ProgramCompletionWidgetResponse | null;
  streakWidget: StreakWidgetResponse | null;
  targetsWidget: TargetsWidgetResponse | null;
  progressChartWidget: ProgressChartWidgetResponse | null;
}

// Trainer
export interface AdherenceWidgetRes {
  percentage: number;
  daysRange: {
    start: Date;
    end: Date;
  };
}

export interface ClientScheduleWorkout {
  workoutName: string;
  date: Date;
}

export interface ClientWorkoutOnDay {
  id: string;
  username: string;
  pfpUrl: string | null;
  fullName: string;
  workout: WorkoutWithDate;
}

export interface TrainerScheduleWidgetRes {
  [date: string]: ClientWorkoutOnDay[];
}

export interface TrainerTodoListItem {
  id: string;
  content: string;
  completed: boolean;
}

export interface TrainerTodoListWidgetRes {
  items: TrainerTodoListItem[];
}

export interface ClientProgressData {
  clientData: {
    id: string;
    pfpUrl: string;
    fullName: string;
  };
  chartData: ProgressChartDataset[];
}

export type AllClientsProgressWidgetRes = ClientProgressData[];

export interface TrainerDashboardRes {
  avgClientProgressWidget: null;
  adherenceRateWidget: AdherenceWidgetRes;
  completedWorkoutsWidget: number | null;
  activeProgramsWidget: number | null;
  scheduleWidget: TrainerScheduleWidgetRes | null;
  clientsWidget: null;
  allClientsProgressWidget: AllClientsProgressWidgetRes | null;
  todoWidget: TrainerTodoListWidgetRes | null;
}
