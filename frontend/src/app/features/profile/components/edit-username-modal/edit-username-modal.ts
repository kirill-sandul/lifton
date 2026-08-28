import { Component, inject, output } from '@angular/core';
import { Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { BaseInputComponent } from '@shared/components/base-input/base-input';
import { LucideAsterisk, LucideTriangleAlert } from '@lucide/angular';
import { ModalComponent } from '@shared/components/modal/modal';
import { FormControl, Validators } from '@angular/forms';
import { usernameValidator } from '@shared/validators/username.validator';
import { UserService } from '@core/services/user/user.service';
import { ApiKnownErrorResType } from '@core/api-contract/errors';
import { SnackbarService } from '@core/services/snackbar/snackbar.service';
import { SNACKBAR_MSG_REGISTRY } from '@shared/constants/ui-mapping/snackbar-msg-registry';

@Component({
  selector: 'app-edit-username-modal',
  imports: [BaseInputComponent, ModalComponent, AsyncPipe, LucideAsterisk, LucideTriangleAlert],
  templateUrl: './edit-username-modal.html',
  styleUrl: './edit-username-modal.scss',
})
export class EditUsernameModal {
  router = inject(Router);
  userService = inject(UserService);
  snackbarService = inject(SnackbarService);

  usernameControl = new FormControl<string | null>(null, [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(32),
    usernameValidator(),
  ]);

  onClose = output();

  isSameUsername() {
    return this.userService.userProfile()?.username === this.usernameControl.value;
  }

  onSubmit() {
    if (this.usernameControl.invalid || !this.usernameControl.value) return;

    this.userService.editUsername(this.usernameControl.value).subscribe({
      next: (updatedUser) => {
        this.router.navigate([`/profile/${updatedUser.username}`]);
        this.snackbarService.newSnackbar(SNACKBAR_MSG_REGISTRY.EDIT_USERNAME, 'success');
        this.onClose.emit();
      },
      error: ({ error }: HttpErrorResponse) => {
        if (error.statusCode === 409 && error.message === ApiKnownErrorResType.EXISTING_USERNAME) {
          this.usernameControl.setErrors({
            serverUsernameError: true,
          });
        } else {
          this.snackbarService.newSnackbar(
            `${SNACKBAR_MSG_REGISTRY.EDIT_USERNAME_FAIL} - ${error.daysLeft} day(s) left`,
            'error',
          );
          this.onClose.emit();
        }
      },
    });
  }
}
