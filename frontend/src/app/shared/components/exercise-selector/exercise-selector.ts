import { Component, computed, effect, input, output, signal } from '@angular/core';
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

  processedOptions = computed<(PcExerciseSelectorOption & { id: string })[]>(() => {
    return [
      {
        id: crypto.randomUUID(),
        label: 'All exercises',
        value: this.options(),
        _all_option: true,
      },
      ...this.options().map((option) => ({
        ...option,
        id: crypto.randomUUID(),
      })),
    ];
  });

  isOpen = signal(false);

  onSelect = output<PcExerciseSelectorOption>();

  get selectedOption() {
    const toSelect = this.processedOptions().find((o) => o.id === this.control.value);

    if (toSelect) {
      this.control.setValue(toSelect.id);
      this.onSelect.emit(toSelect);
      return toSelect;
    } else {
      this.control.setValue(this.processedOptions()[0].id);
      this.onSelect.emit(this.processedOptions()[0]);
      return this.processedOptions()[0];
    }
  }

  selectOption(option: PcExerciseSelectorOption & { id: string }) {
    this.control.setValue(option.id);
    this.onSelect.emit(option);
    this.isOpen.set(false);
  }
}
