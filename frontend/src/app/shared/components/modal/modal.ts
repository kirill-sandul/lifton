import { Component, input, output } from '@angular/core';
import { ButtonComponent } from '../button/button';

@Component({
  selector: 'app-modal',
  imports: [ButtonComponent],
  templateUrl: './modal.html',
  styleUrl: './modal.scss',
})
export class ModalComponent {
  title = input.required<string>();
  subTitle = input<string>();
  acceptOption = input<string>();
  discardOption = input.required<string>();
  maxWidth = input<number | null>();

  acceptBtnDisabled = input<boolean>();

  onSubmit = output();
  onDiscard = output();

  onOutClick(event: PointerEvent) {
    const clickTarget = event.target as HTMLElement;

    if (clickTarget?.className == 'modal-window-wrapper') this.onDiscard.emit();
  }
}
