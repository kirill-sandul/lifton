import { ClientProfileWithUser, UserProfile } from '@core/models/user.models';

export enum TrainingCycle {
  WEEK = 'WEEK',
  TWO_WEEKS = 'TWO_WEEKS',
  THREE_WEEKS = 'THREE_WEEKS',
  FOUR_WEEKS = 'FOUR_WEEKS',
}

export enum WeekDay {
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
  SUNDAY = 'SUNDAY',
}

export interface TrainingProgram {
  id: string;
  name: string;
  startDate: Date | null;
  endDate: Date | null;
  cycle: TrainingCycle;
  weeks: ProgramWeek[];
  targets: Target[];
  clientProfiles: ClientProfileWithUser[];
}

export interface ProgramWeek {
  workouts: Workout[];
}

export interface ExerciseSet {
  index: number;
  reps: number;
  targetValue: number;
}

export interface Exercise {
  order?: number;
  name: string;
  unit: string;
  sets: ExerciseSet[];
}

export interface Workout {
  day: WeekDay;
  name: string;
  exercises: Exercise[];
}

export interface Target {
  id?: string;
  name: string;
  initialValue: number;
  currentValue?: number;
  targetValue: number;
  unit: string;
  completionPercent?: number;
  exerciseId?: string | null;
  trainingPlanId?: string;
}

export type ClientWorkoutOnDay = UserProfile & {
  plannedWorkout: Workout;
};

export type ExerciseSetRecordUi = {
  id: string;
  exerciseId: string;
  index: number;
  executedReps: number;
  executedValue: number;
  targetReps: number;
  targetValue: number;
  skipped: boolean;
  _wTouched: boolean;
  _rTouched: boolean;
};

export interface ExerciseRecordUi {
  id: string;
  order: number;
  name: string;
  unit: string;
  sets: ExerciseSetRecordUi[];
  skipped: boolean;
}

export interface WorkoutRecordUi {
  name: string;
  day: WeekDay;
  exercises: ExerciseRecordUi[];
  durationSec: number;
  originalWorkoutId: string;
}
