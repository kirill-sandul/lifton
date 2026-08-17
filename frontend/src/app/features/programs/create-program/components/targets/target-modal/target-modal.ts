import { Component, effect, input, output } from '@angular/core';
import { ModalComponent } from '@shared/components/modal/modal';
import { BaseInputComponent } from '@shared/components/base-input/base-input';
import { LucideDynamicIcon } from '@lucide/angular';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  TargetForm,
  TargetModalDefaults,
} from '@features/programs/create-program/models/create-program.models';
import { Target } from '@core/models/training.models';

@Component({
  selector: 'app-target-modal',
  imports: [ModalComponent, BaseInputComponent, ReactiveFormsModule, LucideDynamicIcon],
  templateUrl: './target-modal.html',
  styleUrl: './target-modal.scss',
})
export class TargetModalComponent {
  onClose = output();
  onCreate = output<Target>();

  defaultValues = input<TargetModalDefaults>({
    name: '',
    unit: '',
    initialValue: 0,
    targetValue: 0,
  });

  targetForm: FormGroup<TargetForm> = new FormGroup({
    name: new FormControl(this.defaultValues().name, [Validators.required]),
    unit: new FormControl(this.defaultValues().unit, [Validators.required]),
    initialValue: new FormControl(this.defaultValues().initialValue, [
      Validators.required,
      Validators.min(0),
    ]),
    targetValue: new FormControl(this.defaultValues().targetValue, [
      Validators.required,
      Validators.min(0),
    ]),
  });

  constructor() {
    effect(() => {
      const defaultValues = this.defaultValues();

      if (!defaultValues) return;

      this.targetForm.patchValue({
        name: defaultValues.name,
        unit: defaultValues.unit,
        initialValue: defaultValues.initialValue,
        targetValue: defaultValues.targetValue,
      });
    });
  }

  onSubmit() {
    const { name, unit, initialValue, targetValue } = this.targetForm.value;

    if (!name || !unit || !initialValue || !targetValue) return;
    else if (this.targetForm.invalid) return;

    const targetModel: Target = {
      name,
      unit,
      initialValue,
      targetValue,
    };

    this.onCreate.emit(targetModel);
    this.onClose.emit();
  }
}
