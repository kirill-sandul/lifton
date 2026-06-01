import { UserGoal, UserProfile } from '@core/models/user.models';

export interface ExerciseSet {
  id: string;
  exerciseId: string;
  reps: number;
  targetValue: number;
}

export interface Exercise {
  id: string;
  name: string;
  workoutId: string;
  unit: string;
  sets: ExerciseSet[];
}

export interface Workout {
  id: string;
  day: string;
  name?: string;
  trainingPlanId: string;
  exercises: Exercise[];
  clients?: UserProfile[];
}

export interface Target {
  id: string;
  type: UserGoal;
  name: string;
  currentValue: number;
  targetValue: number;
  unit: string;
  completionPercent: number;
  exerciseId: string | null;
  trainingPlanId: string;
}

export type ClientWorkoutOnDay = UserProfile & {
  plannedWorkout: Workout;
};
