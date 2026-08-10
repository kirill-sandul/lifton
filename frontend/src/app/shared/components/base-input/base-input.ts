import { Component, input, model, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { APP_ICONS } from '@core/icons';

type InputType = 'text' | 'email' | 'password' | 'textarea' | 'number';

@Component({
  selector: 'app-input',
  imports: [ReactiveFormsModule, ...APP_ICONS],
  templateUrl: './base-input.html',
})
export class BaseInputComponent {
  id = input('');
  name = input('');
  type = input<InputType>('text');
  placeholder = input('');
  control = input<FormControl<any>>(new FormControl());
  style = input<'outlined' | 'filled'>('outlined');

  dynamicType = signal<InputType>('text');

  value = model<string>('');

  ngAfterViewInit() {
    this.dynamicType.set(this.type());
  }

  get errorMessages(): Record<string, string> {
    return {
      required: `${this.name()} is required`,
      email: 'Email is invalid',
      phone: 'Phone number is invalid',
      digitsOnly: `${this.name()} should be a number`,
      minlength: `${this.name()} has to be longer`,
      maxlength: `${this.name()} is too long`,
      min: `${this.name()} is too small`,
      max: `${this.name()} is too large`,
      serverEmailError: 'An account linked to this email already exists',
      empty: 'Value cannot be empty',
    };
  }

  get errorMessage(): string {
    const errors = this.control().errors;

    if (!errors || errors['serverCredentialsError']) return '';

    const firstError = Object.keys(errors)[0];
    return this.errorMessages[firstError] ?? 'Invalid value';
  }
}
