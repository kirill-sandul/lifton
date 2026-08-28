import { Target, TrainingCycle, WeekDay } from '@core/models/training.models';
import { ClientProfileWithUser } from '@core/models/user.models';

export interface CreateExerciseSetRecordDto {
  index: number;
  executedReps: number;
  executedValue: number;
  targetReps: number;
  targetValue: number;
  skipped: boolean;
}

export interface CreateExerciseRecordDto {
  name: string;
  unit: string;
  order: number;
  sets: CreateExerciseSetRecordDto[];
  skipped: boolean;
}

export interface CreateWorkoutRecordDto {
  name: string;
  day: WeekDay;
  durationSec: number;
  exercises: CreateExerciseRecordDto[];
  originalWorkoutId: string;
}

export interface TrainingProgramResponse {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  cycle: TrainingCycle;
  weeks: ProgramWeekResponse[];
  targets: Target[];
  clientProfiles: ClientProfileWithUser[];
}

export interface ProgramWeekResponse {
  id: string;
  workouts: WorkoutResponse[];
}

export interface WorkoutResponse {
  id: string;
  day: WeekDay;
  name: string;
  exercises: WorkoutExerciseResponse[];
  programWeekId: string;
}

export interface WorkoutExerciseResponse {
  id: string;
  workoutId: string;
  order: number;
  name: string;
  unit: string;
  sets: WorkoutExerciseSetResponse[];
}

export interface WorkoutExerciseSetResponse {
  id: string;
  exerciseId: string;
  index: number;
  reps: number;
  targetValue: number;
}
