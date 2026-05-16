import { Component, input, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { APP_ICONS } from '@core/icons';

type InputType = 'text' | 'email' | 'password' | 'textarea'

@Component({
  selector: 'app-input',
  imports: [ReactiveFormsModule, ...APP_ICONS],
  templateUrl: './base-input.html'
})
export class BaseInputComponent {
  id = input('')
  type = input<InputType>('text')
  placeholder = input('')
  control = input<FormControl<any>>(new FormControl());
  invalidMsg = input('')
  style = input<'outlined' | 'filled'>('outlined')

  dynamicType = signal<InputType>('text')

  ngAfterViewInit(){
    this.dynamicType.set(this.type())
  }
}
