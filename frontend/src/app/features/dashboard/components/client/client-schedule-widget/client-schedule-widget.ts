import { Component, effect, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DashboardService } from '@features/dashboard/services/dashboard.service';
import { Workout } from '@core/models/training.models';
import { CalendarWidgetComponent } from '@features/dashboard/components/calendar-widget/calendar-widget';
import { WorkoutResponse } from '@core/api-contract/training.api';

@Component({
  selector: 'app-client-schedule-widget',
  imports: [DatePipe, CalendarWidgetComponent],
  templateUrl: './client-schedule-widget.html',
  styleUrl: './client-schedule-widget.scss',
})
export class ClientScheduleWidgetComponent {
  dashboardService = inject(DashboardService);

  selectedDay = signal<Date>(new Date());
  dayContent = signal<WorkoutResponse | null>(null);
  schedule = this.dashboardService.programSchedule;

  constructor() {
    effect(() => {
      const workout = this.getDayExercises(this.selectedDay());

      this.dayContent.set(workout ?? null);
    });
  }

  getDayExercises(day: Date) {
    this.selectedDay.set(day);

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
}
