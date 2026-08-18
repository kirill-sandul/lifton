import { Component, DestroyRef, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ButtonComponent } from '@shared/components/button/button';
import { BaseInputComponent } from '@shared/components/base-input/base-input';
import { APP_ICONS } from '@core/icons';
import { AuthService } from '@features/auth/services/auth.service';
import { LoginFormControls } from '@features/auth/models/auth.models';
import { Router } from '@angular/router';
import { ApiKnownErrorResType } from '@shared/api-contract/errors';

@Component({
  selector: 'app-login-page',
  imports: [BaseInputComponent, ReactiveFormsModule, ButtonComponent, ...APP_ICONS],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPageComponent {
  authService = inject(AuthService);
  router = inject(Router);

  loginForm: FormGroup<LoginFormControls> = new FormGroup({
    identity: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.loginForm.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.loginForm.setErrors(null);
      this.loginForm.controls.identity.setErrors(null);
      this.loginForm.controls.password.setErrors(null);
    });
  }

  checkCredentialsError({ error }: HttpErrorResponse) {
    if (
      (error.statusCode === 401 && error.message === ApiKnownErrorResType.INVALID_CREDENTIALS) ||
      error.statusCode === 400
    ) {
      const identityControl = this.loginForm.get('identity');
      const passwordControl = this.loginForm.get('password');

      identityControl?.setErrors({ serverCredentialsError: true });
      passwordControl?.setErrors({ serverCredentialsError: true });

      identityControl?.markAsTouched();
      passwordControl?.markAsTouched();

      this.loginForm.setErrors({
        serverCredentialsError: true,
      });
    }
  }

  onSubmit() {
    const { identity, password } = this.loginForm.value;

    if (identity && password)
      this.authService.login({ identity, password }).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (error) => this.checkCredentialsError(error),
      });
  }
}
