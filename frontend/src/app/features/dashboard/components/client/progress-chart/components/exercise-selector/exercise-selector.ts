import { Component, input, output, signal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LucideArrowDown, LucideCheck } from '@lucide/angular';
import { PcExerciseSelectorOption } from '@core/models/ui.models';

@Component({
  selector: 'progress-chart-exercise-selector',
  imports: [LucideArrowDown, LucideCheck],
  templateUrl: './exercise-selector.html',
  styleUrl: './exercise-selector.scss',
})
export class ProgressChartExerciseSelector {
  control = new FormControl();
  options = input.required<PcExerciseSelectorOption[]>();

  isOpen = signal(false);

  onSelect = output<any>();

  get selectedOption() {
    const toSelect = this.options().find((o) => o.value === this.control.value);

    if (toSelect) {
      this.control.setValue(toSelect.value);
      this.onSelect.emit(toSelect.value);
      return toSelect;
    } else {
      this.control.setValue(this.options()[0].value);
      this.onSelect.emit(this.options()[0].value);
      return this.options()[0];
    }
  }
}
