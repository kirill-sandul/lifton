import { Component, inject } from '@angular/core';
import { ClientFacade } from '@core/facades/roles/client/client.facade';

@Component({
  selector: 'app-streak-widget',
  imports: [],
  templateUrl: './streak-widget.html',
  styleUrl: './streak-widget.scss',
})
export class StreakWidgetComponent {
  clientFacade = inject(ClientFacade);

  weekWordDisplay(streakWeeks: number) {
    if (streakWeeks > 1) return 'weeks';
    else return 'week';
  }
}
