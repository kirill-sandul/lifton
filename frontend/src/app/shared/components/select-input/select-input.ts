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
  compact = input<boolean>(false);

  isOpen = signal(false);

  get selectedOption() {
    const controlValue = this.control().value ?? this.options()[0].value;
    return this.options().find((o) => o.value === controlValue);
  }
}
