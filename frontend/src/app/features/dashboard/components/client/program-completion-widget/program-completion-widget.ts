import { Component, inject } from '@angular/core';
import { ProgressBarComponent } from '@shared/components/progress-bar/progress-bar';
import { ClientFacade } from '@core/facades/roles/client/client.facade';

@Component({
  selector: 'app-program-completion-widget',
  imports: [ProgressBarComponent],
  templateUrl: './program-completion-widget.html',
  styleUrl: './program-completion-widget.scss',
})
export class CompletionWidgetComponent {
  clientFacade = inject(ClientFacade);

  workoutsWordDisplay(workoutsCompleted: number) {
    if (workoutsCompleted === 0 || workoutsCompleted > 1) return 'workouts';
    else if (workoutsCompleted === 1) return 'workout';

    return 'workouts';
  }

  weeksPassedDisplay(weeksPassed: number, daysOffset: number) {
    if (daysOffset === 0) {
      if (weeksPassed > 1) return `${weeksPassed} weeks`;
      else if (weeksPassed === 1) return `${weeksPassed}st week`;
      else return '1st week';
    }

    if (weeksPassed > 1) return `${weeksPassed} weeks (and ${daysOffset} days)`;
    else if (weeksPassed === 1) return `${weeksPassed} week (and ${daysOffset} days)`;

    return '1st week';
  }

  weeksTotalDisplay(weeksTotal: number) {
    if (weeksTotal > 1) return `${weeksTotal} weeks`;
    else return `${weeksTotal} week`;
  }
}
