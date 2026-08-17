import { Component, inject, output, signal } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from '@core/services/user/user.service';
import { FileInputComponent } from '@shared/components/file-input/file-input';
import { ModalComponent } from '@shared/components/modal/modal';
import { PfpCircleComponent } from '@shared/components/pfp-circle/pfp-circle';

@Component({
  selector: 'app-edit-pfp-modal',
  imports: [ModalComponent, FileInputComponent, PfpCircleComponent],
  templateUrl: './edit-pfp-modal.html',
  styleUrl: './edit-pfp-modal.scss',
})
export class EditPfpModalComponent {
  userService = inject(UserService);

  previewImgUrl = signal('/assets/no-pfp.png');
  pfpControl = new FormControl<File | null>(null, [Validators.required]);

  onClose = output();

  constructor() {
    const currentPfpUrl = this.userService.userProfile()?.pfpUrl;

    if (currentPfpUrl) this.previewImgUrl.set(currentPfpUrl);
  }

  getPreview() {
    if (!this.pfpControl.value) return;

    const previewUrl = URL.createObjectURL(this.pfpControl.value);

    if (this.previewImgUrl) {
      URL.revokeObjectURL(this.previewImgUrl());
    }

    this.previewImgUrl.set(previewUrl);
  }

  onSubmit() {
    const newImg = this.pfpControl.value;

    if (newImg)
      this.userService.editPfp(newImg).subscribe({
        next: () => this.onClose.emit(),
      });
  }
}
