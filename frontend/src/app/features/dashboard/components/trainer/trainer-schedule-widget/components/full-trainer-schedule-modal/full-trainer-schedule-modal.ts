import { Component, computed, input, output, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { startOfDay } from 'date-fns';
import { ModalComponent } from '@shared/components/modal/modal';
import { DatepickerValue, HolidayProvider, NgxsmkDatepickerComponent } from 'ngxsmk-datepicker';
import { TrainerWorkoutsDetails } from '@features/dashboard/components/trainer/trainer-schedule-widget/components/trainer-workouts-details/trainer-workouts-details';
import { ClientWorkoutOnDay, TrainerScheduleWidgetRes } from '@core/api-contract/dashboard.api';
import { getDayTrainerWorkouts } from '@core/utils/get-day-trainer-workouts';

@Component({
  selector: 'app-full-trainer-schedule-modal',
  imports: [DatePipe, ModalComponent, NgxsmkDatepickerComponent, TrainerWorkoutsDetails],
  templateUrl: './full-trainer-schedule-modal.html',
  styleUrl: './full-trainer-schedule-modal.scss',
})
export class FullTrainerScheduleModal {
  schedule = input.required<TrainerScheduleWidgetRes>();

  selectedDate = signal<Date>(new Date());
  dayContent = signal<ClientWorkoutOnDay[] | null>(null);

  selectedWorkoutForDetails = signal<ClientWorkoutOnDay | null>(null);

  onClose = output();

  private workoutDatesSet = computed(() => {
    const schedule = this.schedule();

    if (!schedule) return new Set<number>();

    return new Set<number>(
      Object.keys(schedule).map((date) => startOfDay(new Date(date)).getTime()),
    );
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
    this.selectedWorkoutForDetails.set(null);

    if (value instanceof Date) {
      const foundWorkout = getDayTrainerWorkouts(this.schedule(), value);

      this.dayContent.set(foundWorkout);
    }
  }

  protected readonly signal = signal;
}
