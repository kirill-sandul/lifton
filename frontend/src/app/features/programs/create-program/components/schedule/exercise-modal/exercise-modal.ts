import { Component, effect, input, output } from '@angular/core';
import { ModalComponent } from '@shared/components/modal/modal';
import { BaseInputComponent } from '@shared/components/base-input/base-input';
import { LucideCircleX, LucidePlus } from '@lucide/angular';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Exercise, ExerciseSet, ExerciseUnit } from '@core/models/training.models';
import {
  ExerciseForm,
  ExerciseModalDefaults,
  ExerciseSetForm,
} from '@features/programs/create-program/models/create-program.models';
import { InputAutocomplete } from '@shared/components/input-autocomplete/input-autocomplete';
import { AutocompleteInputList, AutocompleteInputListItem } from '@core/models/ui.models';
import { SelectInputComponent } from '@shared/components/select-input/select-input';
import { UNITS_LABELS } from '@shared/constants/ui-mapping/units.labels';

@Component({
  selector: 'app-exercise-modal',
  imports: [
    ModalComponent,
    BaseInputComponent,
    LucidePlus,
    ReactiveFormsModule,
    LucideCircleX,
    InputAutocomplete,
    SelectInputComponent,
  ],
  templateUrl: './exercise-modal.html',
  styleUrl: './exercise-modal.scss',
})
export class ExerciseModal {
  protected readonly UNITS_LABELS = UNITS_LABELS;

  autocompleteList = input<AutocompleteInputList | null>();

  defaultValues = input<ExerciseModalDefaults>({
    name: '',
    unit: null,
    sets: [],
  });

  onClose = output();
  onCreate = output<Exercise>();

  exerciseForm: FormGroup<ExerciseForm> = new FormGroup({
    name: new FormControl(this.defaultValues().name, [Validators.required]),
    unit: new FormControl(this.defaultValues().unit, [Validators.required]),
    sets: new FormArray([this.generateExerciseSetForm()]),
  });

  constructor() {
    effect(() => {
      const defaultValues = this.defaultValues();

      if (!defaultValues) return;
      this.rebuildSetsForm(defaultValues.sets);

      this.exerciseForm.patchValue({
        name: defaultValues.name,
        unit: defaultValues.unit,
        sets: defaultValues.sets,
      });
    });
  }

  get sets() {
    return this.exerciseForm.controls.sets;
  }

  private rebuildSetsForm(sets: ExerciseSet[]) {
    if (!sets.length) return null;

    const setsFormArray = this.exerciseForm.controls.sets;

    setsFormArray.clear();

    sets.forEach(({ reps, targetValue }) => {
      setsFormArray.push(this.generateExerciseSetForm(reps, targetValue));
    });

    return sets;
  }

  private generateExerciseSetForm(
    reps: number | null = null,
    targetValue: number | null = null,
  ): FormGroup<ExerciseSetForm> {
    return new FormGroup<ExerciseSetForm>({
      reps: new FormControl(reps, [Validators.required]),
      targetValue: new FormControl(targetValue, [Validators.required]),
    });
  }

  private normalizeSetsValue() {
    return this.sets.getRawValue().map((set, index) => ({
      index,
      reps: Number(set.reps!),
      targetValue: Number(set.targetValue!),
    }));
  }

  addSet() {
    this.exerciseForm.controls.sets.push(this.generateExerciseSetForm());
  }

  removeSet(index: number) {
    this.exerciseForm.controls.sets.removeAt(index);
  }

  onAutoItemPick(item: AutocompleteInputListItem) {
    this.exerciseForm.patchValue({
      ...this.exerciseForm.value,
      unit: item.props.unit ?? ExerciseUnit,
    });
  }

  onSubmit() {
    const { name, unit } = this.exerciseForm.value;

    if (!name || !unit) return;
    else if (this.exerciseForm.invalid) return;

    const exerciseModel: Exercise = {
      name,
      unit,
      sets: this.normalizeSetsValue(),
    };

    this.onCreate.emit(exerciseModel);
    this.onClose.emit();
  }
}
