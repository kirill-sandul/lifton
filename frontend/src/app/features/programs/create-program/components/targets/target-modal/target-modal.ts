import { Component, effect, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LucideDynamicIcon } from '@lucide/angular';
import { ModalComponent } from '@shared/components/modal/modal';
import { SelectInputComponent } from '@shared/components/select-input/select-input';
import { BaseInputComponent } from '@shared/components/base-input/base-input';
import {
  ExercisesTemporalMap,
  TargetForm,
  TargetModalDefaults,
} from '@features/programs/create-program/models/create-program.models';
import { Target, TargetUi } from '@core/models/training.models';
import { SelectInputOption } from '@core/models/ui.models';
import { targetValueValidator } from '@shared/validators/targetValue.validator';
import { unitToLabel } from '@core/unitToLabel';

@Component({
  selector: 'app-target-modal',
  imports: [
    ModalComponent,
    BaseInputComponent,
    ReactiveFormsModule,
    LucideDynamicIcon,
    SelectInputComponent,
  ],
  templateUrl: './target-modal.html',
  styleUrl: './target-modal.scss',
})
export class TargetModalComponent {
  savedExercisesList = input.required<ExercisesTemporalMap>();

  onClose = output();
  onCreate = output<Target>();

  defaultValues = input<TargetModalDefaults>({
    name: '',
    exerciseTempId: null,
    initialValue: null,
    targetValue: null,
  });

  targetForm: FormGroup<TargetForm> = new FormGroup(
    {
      exerciseTempId: new FormControl(this.defaultValues().exerciseTempId, [Validators.required]),
      name: new FormControl(this.defaultValues().name, [
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      initialValue: new FormControl(this.defaultValues().initialValue, [
        Validators.required,
        Validators.min(0),
      ]),
      targetValue: new FormControl(this.defaultValues().targetValue, [
        Validators.required,
        Validators.min(0),
      ]),
    },
    { validators: targetValueValidator },
  );

  constructor() {
    effect(() => {
      const defaultValues = this.defaultValues();

      if (!defaultValues) return;

      this.targetForm.patchValue({
        name: defaultValues.name,
        exerciseTempId: defaultValues.exerciseTempId,
        initialValue: defaultValues.initialValue,
        targetValue: defaultValues.targetValue,
      });
    });
  }

  get getSavedExercisesOptions(): SelectInputOption[] {
    const mapToOptions = Object.values(this.savedExercisesList()).flatMap((exercise) => [
      {
        label: `${exercise.name} (${unitToLabel(exercise.unit)})`,
        value: exercise.tempId,
      },
    ]);

    return mapToOptions;
  }

  onSubmit() {
    const { name, exerciseTempId, initialValue, targetValue } = this.targetForm.value;

    if (!exerciseTempId || !initialValue || !targetValue) return;
    else if (this.targetForm.invalid) return;

    const targetModel: Target = {
      name: name ? name.trim() : '',
      exerciseTempId,
      initialValue,
      targetValue,
    };

    this.onCreate.emit(targetModel);
    this.onClose.emit();
  }
}
