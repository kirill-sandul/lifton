import { Component, inject } from '@angular/core';
import { UserService } from '@core/services/user/user.service';
import { DashboardLayoutComponent } from '@layouts/dashboard-layout/dashboard-layout';
import { DASHBOARD_WIDGET_REGISTRY } from '@shared/constants/ui-mapping/dashboard-registry';

@Component({
  selector: 'app-dashboard-page',
  imports: [DashboardLayoutComponent],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
})
export class DashboardPageComponent {
  userService = inject(UserService);
  widgetRegistry = DASHBOARD_WIDGET_REGISTRY;
}
