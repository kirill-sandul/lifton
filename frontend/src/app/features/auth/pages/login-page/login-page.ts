import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LucideAtSign, LucideEye } from '@lucide/angular';
import { InputComponent } from '@shared/components/input/input';

@Component({
  selector: 'app-login-page',
  imports: [InputComponent, LucideAtSign, LucideEye, ReactiveFormsModule],
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
