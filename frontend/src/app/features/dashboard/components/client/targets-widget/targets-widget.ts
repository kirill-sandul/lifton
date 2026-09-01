import { Component, inject } from '@angular/core';
import { DashboardFacade } from '@features/dashboard/services/dashboard.facade';
import { Target } from '@core/models/training.models';
import { ProgressBarComponent } from '@shared/components/progress-bar/progress-bar';
import { ButtonComponent } from '@shared/components/button/button';
import { LucideArrowUpRight } from '@lucide/angular';

@Component({
  selector: 'app-targets-widget',
  imports: [ProgressBarComponent, ButtonComponent, LucideArrowUpRight],
  templateUrl: './targets-widget.html',
  styleUrl: './targets-widget.scss',
})
export class TargetsWidgetComponent {
  dashboardService = inject(DashboardFacade);

  previewTargets: Target[] = this.dashboardService.clientTargets.slice(0, 2);

  targetCompletionPercent = 0;
}
