import { Component, inject } from '@angular/core';
import { DashboardFacade } from '@features/dashboard/facade/dashboard.facade';
import { ClientFacade } from '@core/facades/roles/client/client.facade';
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
  clientFacade = inject(ClientFacade);
}
