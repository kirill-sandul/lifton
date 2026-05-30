import { Component, inject } from '@angular/core';
import { DashboardService } from '@features/dashboard/services/dashboard.service';
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
  dashboardService = inject(DashboardService);

  previewTargets: Target[] = this.dashboardService.clientTargets.slice(0, 2);
}

