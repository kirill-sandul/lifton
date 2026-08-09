import { Exercise, ExerciseSet, Target } from '@core/models/training.models';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { CdkOverlayOrigin } from '@angular/cdk/overlay';

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
  defaultValues: Target | null;
  editTargetIdx: number;
}

export interface TargetForm {
  name: FormControl<string | null>;
  unit: FormControl<string | null>;
  initialValue: FormControl<number | null>;
  targetValue: FormControl<number | null>;
}

export interface ExerciseForm {
  name: FormControl<string | null>;
  unit: FormControl<string | null>;
  sets: FormArray<FormGroup<ExerciseSetForm>>;
}

export interface ExerciseSetForm {
  reps: FormControl<number | null>;
  targetValue: FormControl<number | null>;
}

export interface ExerciseModalDefaults {
  name: string;
  unit: string;
  sets: ExerciseSet[];
}

export interface TargetModalDefaults {
  name: string;
  unit: string;
  initialValue: number;
  targetValue: number;
}

export interface EditingWorkout {
  workoutIndex: number;
  workoutName: string;
}
