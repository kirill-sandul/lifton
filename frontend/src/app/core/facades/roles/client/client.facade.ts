import { computed, inject, Injectable } from '@angular/core';
import { ClientService } from '@core/services/roles/client/client.service';
import {
  ProgramCompletionWidgetResponse,
  ScheduleWidgetResponse,
  StreakWidgetResponse,
  TargetsWidgetResponse,
  WorkoutWidgetResponse,
} from '@core/api-contract/dashboard.api';

@Injectable({
  providedIn: 'root',
})
export class ClientFacade {
  clientService = inject(ClientService);

  dashboardData = computed(() => {
    if (this.clientService.dashboardData()) return this.clientService.dashboardData();
    else return null;
  });

  workout = computed<WorkoutWidgetResponse | null>(() => {
    const dashboardData = this.dashboardData();
    return dashboardData ? dashboardData.upcomingWorkoutWidget : null;
  });

  schedule = computed<ScheduleWidgetResponse | null>(() => {
    const dashboardData = this.dashboardData();
    return dashboardData ? dashboardData.scheduleWidget : null;
  });

  programCompletion = computed<ProgramCompletionWidgetResponse | null>(() => {
    const dashboardData = this.dashboardData();
    return dashboardData ? dashboardData.completionWidget : null;
  });

  streak = computed<StreakWidgetResponse | null>(() => {
    const dashboardData = this.dashboardData();
    return dashboardData ? dashboardData.streakWidget : null;
  });

  targets = computed<TargetsWidgetResponse | null>(() => {
    const dashboardData = this.dashboardData();
    return dashboardData ? dashboardData.targetsWidget : null;
  });
}
