import { Component, computed, effect, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ClientService } from '@core/services/roles/client/client.service';
import { CalendarWidgetComponent } from '@features/dashboard/components/calendar-widget/calendar-widget';
import { ScheduleWidgetResponse, WorkoutWithDate } from '@core/api-contract/dashboard.api';
import { DashboardFacade } from '@features/dashboard/facade/dashboard.facade';
import { FullScheduleModal } from '@features/dashboard/components/client/client-schedule-widget/components/full-schedule-modal/full-schedule-modal';
import { getDayWorkout } from '@features/dashboard/components/client/client-schedule-widget/utils/get-day-workout';

@Component({
  selector: 'app-client-schedule-widget',
  imports: [DatePipe, CalendarWidgetComponent, FullScheduleModal],
  templateUrl: './client-schedule-widget.html',
  styleUrl: './client-schedule-widget.scss',
})
export class ClientScheduleWidgetComponent {
  clientService = inject(ClientService);
  dashboardFacade = inject(DashboardFacade);

  selectedDay = signal<Date>(new Date());
  dayContent = signal<WorkoutWithDate | null>(null);

  showFullSchedule = signal(false);

  schedule = computed<ScheduleWidgetResponse | null>(
    () => this.clientService.dashboardData()?.scheduleWidget ?? null,
  );

  constructor() {
    effect(() => {
      const schedule = this.schedule();

      this.getDayExercises(new Date());
    });
  }

  getDayExercises(day: Date) {
    this.selectedDay.set(day);

    const foundWorkout = getDayWorkout(this.schedule(), day);

    this.dayContent.set(foundWorkout);
  }
}
