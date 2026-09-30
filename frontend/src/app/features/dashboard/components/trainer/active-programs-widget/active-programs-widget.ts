import { Component, inject } from '@angular/core';
import {TrainerFacade} from '@core/facades/roles/trainer/trainer.facade';

@Component({
  selector: 'app-active-programs-widget',
  imports: [],
  templateUrl: './active-programs-widget.html',
  styleUrl: './active-programs-widget.scss',
})
export class ActiveProgramsWidgetComponent {
  trainerFacade = inject(TrainerFacade);
}
