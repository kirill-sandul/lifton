import {
  Exercise,
  ExerciseSet,
  ExerciseUnit,
  ProgramWeek,
  Target,
  TrainingCycle,
} from '@core/models/training.models';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { CdkOverlayOrigin } from '@angular/cdk/overlay';

export interface TrainingProgramDraft {
  name: string;
  startDate: Date | null;
  endDate: Date | null;
  cycle: TrainingCycle;
  weeks: ProgramWeek[];
  targets: Target[];
}

export interface ExerciseModalData {
  show: boolean;
  defaultValues: Exercise | null;
  editExerciseIdx: number;
}

export interface ConfirmDialogData {
  show: boolean;
  origin: CdkOverlayOrigin;
  elemIndex: number;
}

export interface TargetModalData {
  show: boolean;
  defaultValues: TargetModalDefaults | null;
  editTargetIdx: number;
}

export interface TargetForm {
  name: FormControl<string | null>;
  exerciseTempId: FormControl<string | null>;
  initialValue: FormControl<number | null>;
  targetValue: FormControl<number | null>;
}

export interface ExerciseForm {
  name: FormControl<string | null>;
  unit: FormControl<ExerciseUnit | null>;
  sets: FormArray<FormGroup<ExerciseSetForm>>;
}

export interface ExerciseSetForm {
  reps: FormControl<number | null>;
  targetValue: FormControl<number | null>;
}

export interface ExerciseModalDefaults {
  name: string;
  unit: ExerciseUnit | null;
  sets: ExerciseSet[];
}

export interface TargetModalDefaults {
  name: string | null;
  exerciseTempId: string | null;
  initialValue: number | null;
  targetValue: number | null;
}

export interface EditingWorkout {
  workoutIndex: number;
  workoutName: string;
}

export type ExercisesTemporalMap = {
  [key: string]: { tempId: string; name: string; unit: ExerciseUnit };
};
