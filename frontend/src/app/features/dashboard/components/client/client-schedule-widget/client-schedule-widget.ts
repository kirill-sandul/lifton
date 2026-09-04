import { Component, effect, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CalendarWidgetComponent } from '@features/dashboard/components/calendar-widget/calendar-widget';
import { ClientFacade } from '@core/facades/roles/client/client.facade';
import { WorkoutWithDate } from '@core/api-contract/dashboard.api';
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
  dashboardFacade = inject(DashboardFacade);
  clientFacade = inject(ClientFacade);

  selectedDay = signal<Date>(new Date());
  dayContent = signal<WorkoutWithDate | null>(null);

  showFullSchedule = signal(false);

  constructor() {
    effect(() => {
      const schedule = this.clientFacade.schedule();

      this.getDayExercises(new Date());
    });
  }

  getDayExercises(day: Date) {
    this.selectedDay.set(day);

    const foundWorkout = getDayWorkout(this.clientFacade.schedule(), day);

    this.dayContent.set(foundWorkout);
  }
}
