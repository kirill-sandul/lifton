import { Component, computed, inject } from '@angular/core';
import { DatepickerValue, NgxsmkDatepickerComponent } from 'ngxsmk-datepicker';
import { CreateProgramFacade } from '@features/programs/create-program/facade/create-program.facade';

@Component({
  selector: 'app-date-range-picker',
  imports: [NgxsmkDatepickerComponent],
  templateUrl: './date-range-picker.html',
  styleUrl: './date-range-picker.scss',
})
export class DateRangePicker {
  createProgramFacade = inject(CreateProgramFacade);

  datepickerValue = computed(() => {
    const startValue = this.createProgramFacade.trainingProgramModel().startDate;
    const endValue = this.createProgramFacade.trainingProgramModel().endDate;

    return { start: startValue, end: endValue };
  });

  touched = false;

  today = new Date();
  startDate: Date = new Date();
  endDate: Date = new Date();

  ngAfterContentChecked() {
    if (!this.datepickerValue().start && !this.datepickerValue().end) return;

    this.touched = true;
  }

  onDateChange(value: DatepickerValue) {
    if (!value || value instanceof Date || Array.isArray(value)) return;

    const { start, end } = value;

    if (!start || !end) return;

    this.startDate = start;
    this.endDate = end;

    this.touched = true;
    this.createProgramFacade.setDateRange(start, end);
  }
}
