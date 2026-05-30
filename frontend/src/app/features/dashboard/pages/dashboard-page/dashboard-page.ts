import { Component, inject } from '@angular/core';
import { UserService } from '@core/services/user/user.service';
import { DashboardLayoutComponent } from '@layouts/dashboard-layout/dashboard-layout';
import {
  DASHBOARD_WIDGET_REGISTRY,
  NO_PROGRAM_WIDGET_REGISTRY,
} from '@shared/constants/ui-mapping/dashboard-registry';
import { DashboardService } from '@features/dashboard/services/dashboard.service';

@Component({
  selector: 'app-dashboard-page',
  imports: [DashboardLayoutComponent],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
})
export class DashboardPageComponent {
  userService = inject(UserService);
  dashboardService = inject(DashboardService);
  widgetRegistry = DASHBOARD_WIDGET_REGISTRY;
  noProgramWidgetRegistry = NO_PROGRAM_WIDGET_REGISTRY;
}
