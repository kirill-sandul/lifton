import { Component, computed, inject } from '@angular/core';
import { UserService } from '@core/services/user/user.service';
import { DashboardLayoutComponent } from '@layouts/dashboard-layout/dashboard-layout';
import {
  DASHBOARD_WIDGET_REGISTRY,
  NO_DATA_WIDGET_REGISTRY,
} from '@shared/constants/ui-mapping/dashboard-registry';
import { DashboardService } from '@features/dashboard/services/dashboard.service';
import { UserRole } from '@core/models/user.models';
import { TrainerService } from '@core/services/roles/trainer/trainer.service';
import { ClientService } from '@core/services/roles/client/client.service';

@Component({
  selector: 'app-dashboard-page',
  imports: [DashboardLayoutComponent],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
})
export class DashboardPageComponent {
  userService = inject(UserService);
  dashboardService = inject(DashboardService);

  trainerService = inject(TrainerService);
  clientService = inject(ClientService);

  widgetRegistry = DASHBOARD_WIDGET_REGISTRY;
  noDataWidgetRegistry = NO_DATA_WIDGET_REGISTRY;

  getWidgetRegistry = computed(() => {
    if (this.userService.role() === UserRole.CLIENT) {
      return this.clientService.noData() ? this.noDataWidgetRegistry : this.widgetRegistry;
    } else {
      return this.trainerService.noData() ? this.noDataWidgetRegistry : this.widgetRegistry;
    }
  });

  ngOnInit() {
    if (this.userService.role() === UserRole.CLIENT) {
      this.clientService.getDashboard().subscribe((dashboard) => {
        console.log(dashboard);
      });
    }
  }

  ifNoData() {
    if (this.userService.role() === UserRole.CLIENT) {
      return this.clientService.noData();
    } else {
      return this.trainerService.noData();
    }
  }
}
