import { Component, inject } from '@angular/core';
import { CreateProgramFacade } from '@features/programs/create-program/facade/create-program.facade';
import { BaseInputComponent } from '@shared/components/base-input/base-input';
import { SelectInputComponent } from '@shared/components/select-input/select-input';
import { FormControl, Validators } from '@angular/forms';
import { TrainingCycle } from '@core/models/training.models';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, startWith } from 'rxjs';
import { noEmptyValidator } from '@shared/validators/noEmpty.validator';

@Component({
  selector: 'app-base-info-step',
  imports: [BaseInputComponent, SelectInputComponent],
  templateUrl: './base-info-step.html',
  styleUrl: './base-info-step.scss',
})
export class BaseInfoStep {
  createProgramFacade = inject(CreateProgramFacade);

  programSpanOptions = [
    {
      label: 'Week',
      value: TrainingCycle.WEEK,
    },
    {
      label: '2 weeks',
      value: TrainingCycle.TWO_WEEKS,
    },
    {
      label: '3 weeks',
      value: TrainingCycle.THREE_WEEKS,
    },
    {
      label: '4 weeks',
      value: TrainingCycle.FOUR_WEEKS,
    },
  ];

  programNameControl = new FormControl<string | null>(
    this.createProgramFacade.trainingProgramModel().name,
    [Validators.required, noEmptyValidator()],
  );
  programNameControlValue = toSignal(
    this.programNameControl.valueChanges.pipe(
      startWith(this.createProgramFacade.trainingProgramModel().name),
      map((v) => {
        this.createProgramFacade.trainingProgramValidation.update((v) => ({
          ...v,
          baseInfoInvalid: this.programNameControl.invalid,
        }));

        if (v) this.createProgramFacade.setProgramName(v);
      }),
    ),
  );

  selectSpanControl = new FormControl(this.createProgramFacade.trainingProgramModel().cycle, [
    Validators.required,
  ]);
  selectSpanValue = toSignal(
    this.selectSpanControl.valueChanges.pipe(
      startWith(this.selectSpanControl.value),
      map((v) => (v ? this.createProgramFacade.setProgramCycle(v) : null)),
    ),
  );
}
