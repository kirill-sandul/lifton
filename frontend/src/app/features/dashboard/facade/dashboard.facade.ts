import { computed, inject, Injectable } from '@angular/core';
import { UserService } from '@core/services/user/user.service';
import { ClientService } from '@core/services/roles/client/client.service';
import { TrainerService } from '@core/services/roles/trainer/trainer.service';
import { SnackbarService } from '@core/services/snackbar/snackbar.service';
import { Target } from '@core/models/training.models';
import { SNACKBAR_MSG_REGISTRY } from '@shared/constants/ui-mapping/snackbar-msg-registry';
import { UserRole } from '@core/models/user.models';
import {
  DASHBOARD_WIDGET_REGISTRY,
  NO_DATA_WIDGET_REGISTRY,
} from '@shared/constants/ui-mapping/dashboard-registry';
import { WorkoutSessionService } from '@features/workout-session/service/workout-session';

@Injectable({
  providedIn: 'root',
})
export class DashboardFacade {
  userService = inject(UserService);
  clientService = inject(ClientService);
  trainerService = inject(TrainerService);
  workoutSessionService = inject(WorkoutSessionService);
  snackbarService = inject(SnackbarService);

  clientTargets: Target[] = [
    {
      id: 't1',
      name: 'Bench press',
      initialValue: 40,
      currentValue: 60,
      targetValue: 100,
      unit: 'kg',
      completionPercent: 42,
      exerciseId: 'ex_1',
      trainingPlanId: 'plan_1',
    },
    {
      id: 't2',
      name: 'Body weight',
      initialValue: 40,
      currentValue: 78,
      targetValue: 72,
      unit: 'kg',
      completionPercent: 65,
      exerciseId: null,
      trainingPlanId: 'plan_1',
    },
    {
      id: 't3',
      name: '5km run',
      initialValue: 1000,
      currentValue: 1600,
      targetValue: 1400,
      unit: 'sec',
      completionPercent: 25,
      exerciseId: null,
      trainingPlanId: 'plan_1',
    },
  ];

  widgetRegistry = DASHBOARD_WIDGET_REGISTRY;
  noDataWidgetRegistry = NO_DATA_WIDGET_REGISTRY;

  assignedTrainer = computed(() => {
    if (this.userService.role() !== 'CLIENT') return null;

    return this.userService.userProfile()?.clientProfile!.assignedTrainer;
  });

  assignedTrainingProgram = computed(() => {
    if (this.userService.role() !== 'CLIENT') return null;

    return this.userService.userProfile()?.clientProfile!.trainingProgramId;
  });

  noData = computed((): boolean => {
    if (this.userService.role() === 'CLIENT') {
      return !this.userService.userProfile()?.clientProfile!.trainingProgramId;
    } else {
      return !this.userService.userProfile()?.trainerProfile!.clients?.length;
    }
  });

  getWidgetRegistry = computed(() => {
    if (this.userService.role() === UserRole.CLIENT) {
      return this.clientService.noData() ? this.noDataWidgetRegistry : this.widgetRegistry;
    } else {
      return this.trainerService.noData() ? this.noDataWidgetRegistry : this.widgetRegistry;
    }
  });

  ifNoData = computed(() => {
    if (this.userService.role() === UserRole.CLIENT) {
      return this.clientService.noData();
    } else {
      return this.trainerService.noData();
    }
  });

  getDashboard() {
    if (this.userService.role() === UserRole.CLIENT) {
      this.clientService.getDashboard().subscribe();
    }
  }

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
