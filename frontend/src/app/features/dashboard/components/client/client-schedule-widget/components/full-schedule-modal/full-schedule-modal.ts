import { Component, computed, input, output, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { startOfDay } from 'date-fns';
import { DatepickerValue, HolidayProvider, NgxsmkDatepickerComponent } from 'ngxsmk-datepicker';
import { ModalComponent } from '@shared/components/modal/modal';
import { ScheduleWidgetResponse, WorkoutWithDate } from '@core/api-contract/dashboard.api';
import { WorkoutDetails } from '@shared/components/workout-details/workout-details';
import { getDayWorkout } from '@features/dashboard/components/client/client-schedule-widget/utils/get-day-workout';

@Component({
  selector: 'app-full-schedule-modal',
  imports: [ModalComponent, NgxsmkDatepickerComponent, WorkoutDetails, DatePipe],
  templateUrl: './full-schedule-modal.html',
  styleUrl: './full-schedule-modal.scss',
})
export class FullScheduleModal {
  schedule = input.required<ScheduleWidgetResponse>();
  selectedDate = signal<Date>(new Date());
  dayContent = signal<WorkoutWithDate | null>(null);

  onClose = output();

  private workoutDatesSet = computed(() => {
    const schedule = this.schedule();

    if (!schedule) return new Set<number>();

    return new Set<number>(schedule.map((workout) => startOfDay(new Date(workout.date)).getTime()));
  });

  workoutDaysProvider: HolidayProvider = {
    isHoliday: (date: Date): boolean => {
      const dateMs = startOfDay(date).getTime();

      return this.workoutDatesSet().has(dateMs);
    },
    getHolidayLabel(): string {
      return 'Workout day';
    },
  };

  ngOnInit() {
    this.onDateSelect(this.selectedDate());
  }

  onDateSelect(value: DatepickerValue) {
    if (value instanceof Date) {
      const foundWorkout = getDayWorkout(this.schedule(), value);

      this.dayContent.set(foundWorkout);
    }
  }
}
