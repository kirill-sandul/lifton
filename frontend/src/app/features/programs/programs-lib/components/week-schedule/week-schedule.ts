import { Component, computed, input, signal } from '@angular/core';
import { WeekDayPipe } from '@core/pipes/week-day/week-day-pipe';
import { WeekDropdownComponent } from '@shared/components/week-dropdown/week-dropdown';
import { WeekDay } from '@core/models/training.models';
import { ProgramWeekResponse } from '@core/api-contract/training.api';
import { WorkoutDetails } from '@shared/components/workout-details/workout-details';

@Component({
  selector: 'app-week-schedule',
  imports: [WeekDayPipe, WeekDropdownComponent, WorkoutDetails],
  templateUrl: './week-schedule.html',
  styleUrl: './week-schedule.scss',
})
export class WeekSchedule {
  weekIndex = input.required<number>();
  weekData = input.required<ProgramWeekResponse>();

  selectedWeekDay = signal<WeekDay>(WeekDay.MONDAY);
  selectedDayWorkout = computed(() =>
    this.weekData().workouts.find((value) => value.day === this.selectedWeekDay()),
  );

  weekDays: WeekDay[] = [
    WeekDay.MONDAY,
    WeekDay.TUESDAY,
    WeekDay.WEDNESDAY,
    WeekDay.THURSDAY,
    WeekDay.FRIDAY,
    WeekDay.SATURDAY,
    WeekDay.SUNDAY,
  ];
}
