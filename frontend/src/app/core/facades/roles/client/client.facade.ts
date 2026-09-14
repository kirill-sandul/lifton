import { computed, inject, Injectable } from '@angular/core';
import { ClientService } from '@core/services/roles/client/client.service';
import {
  ProgramCompletionWidgetResponse,
  ProgressChartWidgetResponse,
  ScheduleWidgetResponse,
  StreakWidgetResponse,
  TargetsWidgetResponse,
  WorkoutWidgetResponse,
} from '@core/api-contract/dashboard.api';
import { SNACKBAR_MSG_REGISTRY } from '@shared/constants/ui-mapping/snackbar-msg-registry';
import { WorkoutSessionService } from '@features/workout-session/service/workout-session.service';
import { SnackbarService } from '@core/services/snackbar/snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class ClientFacade {
  clientService = inject(ClientService);
  workoutSessionService = inject(WorkoutSessionService);
  snackbarService = inject(SnackbarService);

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

  progressChart = computed<ProgressChartWidgetResponse | null>(() => {
    const dashboardData = this.dashboardData();
    return dashboardData ? dashboardData.progressChartWidget : null;
  });

  skipWorkout(skipReason: string | null) {
    return this.clientService.skipWorkout(skipReason).subscribe({
      next: () => {
        this.snackbarService.newSnackbar(SNACKBAR_MSG_REGISTRY.SKIP_WORKOUT_SESSION, 'success');
        this.workoutSessionService.clearLocalStorage();
      },
      error: () => {
        this.snackbarService.newSnackbar(SNACKBAR_MSG_REGISTRY.SKIP_WORKOUT_SESSION_FAIL, 'error');
      },
    });
  }
}
