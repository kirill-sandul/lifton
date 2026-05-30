import { Component, effect, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DashboardService } from '@features/dashboard/services/dashboard.service';
import { Workout } from '@core/models/training.models';

@Component({
  selector: 'app-schedule-widget',
  imports: [DatePipe],
  templateUrl: './schedule-widget.html',
  styleUrl: './schedule-widget.scss',
})
export class ScheduleWidgetComponent {
  dashboardService = inject(DashboardService);

  currentDate = new Date();
  week: Date[] = this.getWeekDays(this.currentDate);
  selectedDay = signal<Date>(this.currentDate);
  dayWorkout = signal<Workout | null>(null);
  schedule = this.dashboardService.programSchedule;

  constructor() {
    effect(() => {

      const workout = this.getDayExercises(this.selectedDay());

      this.dayWorkout.set(workout ?? null);
    });
  }

  getDayExercises(day: Date) {
    const dayIdx = day.getDay();

    const weekDays: Record<string, string> = {
      '0': 'SUNDAY',
      '1': 'MONDAY',
      '2': 'TUESDAY',
      '3': 'WEDNESDAY',
      '4': 'THURSDAY',
      '5': 'FRIDAY',
      '6': 'SATURDAY',
    };

    if (!this.schedule) return;

    return this.schedule.find((d) => d.day === weekDays[dayIdx.toString()]);
  }

  getWeekDays(baseDate: Date) {
    const start = new Date(baseDate);
    const day = start.getDay();

    const diff = day === 0 ? -6 : 1 - day;
    start.setDate(start.getDate() + diff);

    return Array.from({ length: 7 }).map((_, i) => {
      const date = new Date(start);
      date.setDate(date.getDate() + i);

      return date;
    });
  }
}
