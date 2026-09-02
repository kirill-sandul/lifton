import { Component, inject } from '@angular/core';
import { UserService } from '@core/services/user/user.service';
import { DashboardLayoutComponent } from '@layouts/dashboard-layout/dashboard-layout';
import { DashboardFacade } from '@features/dashboard/facade/dashboard.facade';

@Component({
  selector: 'app-dashboard-page',
  imports: [DashboardLayoutComponent],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
})
export class DashboardPageComponent {
  userService = inject(UserService);
  dashboardFacade = inject(DashboardFacade);

  ngOnInit() {
    this.dashboardFacade.getDashboard();
  }
}
