import { Component, computed, inject, signal } from '@angular/core';
import { SelectInputComponent } from '@shared/components/select-input/select-input';
import { ButtonComponent } from '@shared/components/button/button';
import { WeekDropdownComponent } from '@features/programs/create-program/components/week-dropdown/week-dropdown';
import { TrainingCycle } from '@core/models/training.models';
import { CreateProgramFacade } from '@features/programs/create-program/facade/create-program.facade';
import { FormControl, Validators } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, startWith } from 'rxjs';
import { TabOption, TabsButtonComponent } from '@shared/components/tabs-button/tabs-button';
import { BaseInputComponent } from '@shared/components/base-input/base-input';
import { LucideDynamicIcon } from '@lucide/angular';

@Component({
  selector: 'app-create-program-page',
  imports: [
    SelectInputComponent,
    ButtonComponent,
    WeekDropdownComponent,
    TabsButtonComponent,
    BaseInputComponent,
    LucideDynamicIcon,
  ],
  templateUrl: './create-program-page.html',
  styleUrl: './create-program-page.scss',
})
export class CreateProgramPageComponent {
  createProgramFacade = inject(CreateProgramFacade);

  createProgramTabs: TabOption[] = [
    {
      label: 'Base info',
    },
    {
      label: 'Schedule',
    },
    {
      label: 'Targets',
    },
  ];

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

  weekOptions = [
    {
      span: TrainingCycle.WEEK,
      weeksRequired: 1,
    },
    {
      span: TrainingCycle.TWO_WEEKS,
      weeksRequired: 2,
    },
    {
      span: TrainingCycle.THREE_WEEKS,
      weeksRequired: 3,
    },
    {
      span: TrainingCycle.FOUR_WEEKS,
      weeksRequired: 4,
    },
  ];

  selectedTabIdx = signal(0);
  nextTabDisabled = computed(() => this.selectedTabIdx() === this.maxTabIdx);
  prevTabDisabled = computed(() => this.selectedTabIdx() === 0);
  readonly maxTabIdx = 2;

  programNameControl = new FormControl<string | null>(null, [Validators.required]);
  selectSpanControl = new FormControl(TrainingCycle.WEEK, [Validators.required]);
  selectSpanValue = toSignal(
    this.selectSpanControl.valueChanges.pipe(
      startWith(this.selectSpanControl.value),
      map((v) => (v ? this.createProgramFacade.setProgramCycle(v) : null)),
    ),
  );

  onChangeTabs(index: number) {
    this.selectedTabIdx.set(index);
  }

  prevTab() {
    if (this.selectedTabIdx() === 0) return;
    this.selectedTabIdx.update((t) => (t -= 1));
  }

  nextTab() {
    if (this.selectedTabIdx() === this.maxTabIdx) {
      return this.createProgram();
    }

    this.selectedTabIdx.update((t) => (t += 1));
  }

  createProgram() {}
}
