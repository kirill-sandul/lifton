import { Component, output } from '@angular/core';
import { ModalComponent } from '@shared/components/modal/modal';

@Component({
  selector: 'app-finish-workout-modal',
  imports: [ModalComponent],
  templateUrl: './finish-workout-modal.html',
  styleUrl: './finish-workout-modal.scss',
})
export class FinishWorkoutModal {
  onDiscard = output();
  onAccept = output();
}
