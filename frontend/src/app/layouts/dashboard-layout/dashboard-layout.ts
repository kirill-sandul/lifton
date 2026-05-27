import { Component, input } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { UserRole } from '@core/models/user.models';
import { DashboardWidgetRegistry } from '@shared/constants/ui-mapping/dashboard-registry';

@Component({
  selector: 'app-dashboard-layout',
  imports: [NgComponentOutlet],
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.scss',
})
export class DashboardLayoutComponent {
  userRole = input.required<UserRole>();
  readonly UserRole = UserRole;

  userFullName = input.required<string>();
  widgetRegistry = input.required<DashboardWidgetRegistry>()
}
