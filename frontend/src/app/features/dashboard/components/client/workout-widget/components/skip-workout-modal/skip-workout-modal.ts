import { Component, output } from '@angular/core';
import { ModalComponent } from '@shared/components/modal/modal';
import { BaseInputComponent } from '@shared/components/base-input/base-input';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-skip-workout-modal',
  imports: [ModalComponent, BaseInputComponent],
  templateUrl: './skip-workout-modal.html',
  styleUrl: './skip-workout-modal.scss',
})
export class SkipWorkoutModal {
  onAccept = output<string | null>();
  onDiscard = output();

  reasonControl = new FormControl<string | null>(null, {
    validators: [Validators.minLength(5), Validators.maxLength(100)],
    updateOn: 'blur',
  });
}
