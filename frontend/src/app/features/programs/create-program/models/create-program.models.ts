import { Exercise, ExerciseSet } from '@core/models/training.models';
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

export interface EditingWorkout {
  workoutIndex: number;
  workoutName: string;
}
