import { Component, inject } from '@angular/core';
import { TrainerFacade } from '@core/facades/roles/trainer/trainer.facade';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-avg-progress-widget',
  imports: [DatePipe],
  templateUrl: './avg-progress-widget.html',
  styleUrl: './avg-progress-widget.scss',
})
export class AvgProgressWidgetComponent {
  trainerFacade = inject(TrainerFacade);
}
