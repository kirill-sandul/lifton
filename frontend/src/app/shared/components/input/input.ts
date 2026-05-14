import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { LucideCircleX } from '@lucide/angular';

@Component({
  selector: 'app-input',
  imports: [ReactiveFormsModule],
  templateUrl: './input.html',
  styleUrl: './input.scss',
})
export class InputComponent {
  id = input('')
  placeholder = input('')
  control = input<FormControl<any>>(new FormControl(''));
  invalidMsg = input('')
}
