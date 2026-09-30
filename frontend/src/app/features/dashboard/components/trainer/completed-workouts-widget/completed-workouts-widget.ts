import { Component, inject } from '@angular/core';
import { TrainerFacade } from '@core/facades/roles/trainer/trainer.facade';

@Component({
  selector: 'app-completed-workouts-widget',
  imports: [],
  templateUrl: './completed-workouts-widget.html',
  styleUrl: './completed-workouts-widget.scss',
})
export class CompletedWorkoutsWidgetComponent {
  trainerFacade = inject(TrainerFacade);
}
