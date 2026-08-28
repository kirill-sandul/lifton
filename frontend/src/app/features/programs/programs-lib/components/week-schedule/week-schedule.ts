import { Component, computed, input, signal } from '@angular/core';
import { WeekDayPipe } from '@core/pipes/week-day/week-day-pipe';
import { WeekDropdownComponent } from '@shared/components/week-dropdown/week-dropdown';
import { ExerciseSet, WeekDay } from '@core/models/training.models';
import { LucideDynamicIcon } from '@lucide/angular';
import { ProgramWeekResponse } from '@core/api-contract/training.api';

@Component({
  selector: 'app-week-schedule',
  imports: [WeekDayPipe, WeekDropdownComponent, LucideDynamicIcon],
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

  openedExerciseIndex = signal<number | null>(null);

  weekDays = [
    WeekDay.MONDAY,
    WeekDay.TUESDAY,
    WeekDay.WEDNESDAY,
    WeekDay.THURSDAY,
    WeekDay.FRIDAY,
    WeekDay.SATURDAY,
    WeekDay.SUNDAY,
  ];

  getTotalReps(sets: ExerciseSet[]) {
    return sets.reduce((acc, cur) => acc + cur.reps, 0);
  }

  getTotalVolume(sets: ExerciseSet[]) {
    return sets.reduce((acc, cur) => acc + cur.targetValue * cur.reps, 0);
  }

  toggleExerciseDetail(exerciseIdx: number) {
    if (exerciseIdx === this.openedExerciseIndex()) return this.openedExerciseIndex.set(null);

    this.openedExerciseIndex.set(exerciseIdx);
  }
}
