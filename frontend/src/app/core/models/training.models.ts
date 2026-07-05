import { UserGoal, UserProfile } from '@core/models/user.models';

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
  cycle: TrainingCycle;
  weeks: ProgramWeek[];
}

export interface ProgramWeek {
  workouts: Workout[];
}

export interface ExerciseSet {
  id?: string;
  exerciseId?: string;
  reps: number;
  targetValue: number;
}

export interface Exercise {
  id?: string;
  name: string;
  workoutId?: string;
  unit: string;
  sets: ExerciseSet[];
}

export interface Workout {
  id?: string;
  day: WeekDay;
  name: string;
  trainingPlanId?: string;
  exercises: Exercise[];
  clients?: UserProfile[];
}

export interface Target {
  id?: string;
  type: UserGoal;
  name: string;
  currentValue: number;
  targetValue: number;
  unit: string;
  completionPercent: number;
  exerciseId?: string | null;
  trainingPlanId: string;
}

export type ClientWorkoutOnDay = UserProfile & {
  plannedWorkout: Workout;
};
