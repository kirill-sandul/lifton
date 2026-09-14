import { computed, inject, Injectable } from '@angular/core';
import { UserService } from '@core/services/user/user.service';
import { ClientService } from '@core/services/roles/client/client.service';
import { TrainerService } from '@core/services/roles/trainer/trainer.service';
import { UserRole } from '@core/models/user.models';
import {
  DASHBOARD_WIDGET_REGISTRY,
  NO_DATA_WIDGET_REGISTRY,
} from '@shared/constants/ui-mapping/dashboard-registry';

@Injectable({
  providedIn: 'root',
})
export class DashboardFacade {
  userService = inject(UserService);
  clientService = inject(ClientService);
  trainerService = inject(TrainerService);

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
}
