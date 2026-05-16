import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '@shared/components/button/button';
import { BaseInputComponent } from '@shared/components/base-input/base-input';
import { APP_ICONS } from '@core/icons';

@Component({
  selector: 'app-login-page',
  imports: [BaseInputComponent, ReactiveFormsModule, ButtonComponent, ...APP_ICONS],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPageComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.email,
      Validators.required
    ]),
    password: new FormControl('', [
      Validators.required
    ])
  })

  onSubmit(){
    console.log(this.loginForm.value)
  }
}
