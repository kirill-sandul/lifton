import { Component, inject } from '@angular/core';
import { TrainerFacade } from '@core/facades/roles/trainer/trainer.facade';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-adherence-rate-widget',
  imports: [DatePipe],
  templateUrl: './adherence-rate-widget.html',
  styleUrl: './adherence-rate-widget.scss',
})
export class AdherenceRateWidgetComponent {
  trainerFacade = inject(TrainerFacade);

  adherenceRateConclusion(percentage: number): string {
    if (percentage === 100) return "People don't skip your classes at all";
    else if (percentage > 75) return "The majority don't skip your classes";
    else if (percentage < 75 && percentage > 50) return 'There are some issues with adherence rate';
    else return 'There is a major problem with workout absence rate';
  }

  getConclusionStyle(percentage: number): string {
    if (percentage === 100) return 'success';
    else if (percentage > 75) return 'success';
    else if (percentage < 75 && percentage > 50) return 'warn';
    else return 'error';
  }
}
