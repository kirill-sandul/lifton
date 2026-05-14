import { Component } from '@angular/core';
import { InputComponent } from '@shared/components/input/input';

@Component({
  selector: 'app-login-page',
  imports: [InputComponent],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPageComponent {}
