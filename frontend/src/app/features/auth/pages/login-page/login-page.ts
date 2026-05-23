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
import { tap } from 'rxjs';

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
    email: new FormControl('', [
      Validators.email,
      Validators.required
    ]),
    password: new FormControl('', [
      Validators.required
    ])
  })

  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.loginForm.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.loginForm.setErrors(null);
      this.loginForm.controls.email.setErrors(null);
      this.loginForm.controls.password.setErrors(null);
    });
  }

  checkCredentialsError({ error }: HttpErrorResponse){
    if((error.statusCode === 401 && error.message === 'INVALID_CREDENTIALS') || error.statusCode === 400) {
      const emailControl = this.loginForm.get('email');
      const passwordControl = this.loginForm.get('password');
      
      emailControl?.setErrors({ serverCredentialsError: true });
      passwordControl?.setErrors({ serverCredentialsError: true });

      emailControl?.markAsTouched();
      passwordControl?.markAsTouched();

      this.loginForm.setErrors({
        serverCredentialsError: true
      })
    }
  }

  onSubmit(){
    const { email, password } = this.loginForm.value;

    if(email && password) this.authService.login({ email, password }).subscribe({
      next: (response) => {
        this.router.navigate(['/'])
      },
      error: (error) => this.checkCredentialsError(error)
    })
  }
}
