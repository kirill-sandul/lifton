import { Component, input, signal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LucideArrowDown, LucideCheck } from '@lucide/angular';

export interface SelectInputOption {
  label: string;
  value: string;
}

@Component({
  selector: 'app-select-input',
  imports: [LucideArrowDown, LucideCheck],
  templateUrl: './select-input.html',
  styleUrl: './select-input.scss',
})
export class SelectInputComponent {
  control = input<FormControl<any>>(new FormControl());
  options = input.required<SelectInputOption[]>();

  isOpen = signal(false);

  get selectedOption() {
    return this.options().find((o) => o.value === this.control().value);
  }
}
