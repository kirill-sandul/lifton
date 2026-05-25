import { Component, computed, input, signal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TitleCasePipe } from '@angular/common';
import { LucideArrowDown, LucideCheck } from '@lucide/angular';

export interface SelectInputOption {
  label: string,
  value: string
}

@Component({
  selector: 'app-select-input',
  imports: [LucideArrowDown, LucideCheck, TitleCasePipe],
  templateUrl: './select-input.html',
  styleUrl: './select-input.scss',
})
export class SelectInputComponent {
  control = input<FormControl<any>>(new FormControl());
  options = input.required<SelectInputOption[]>();

  defaultOption = computed(() => this.options()[0])
  isOpen = signal(false);

  get selectedOption() {
    return this.options().find(
      o => o.value === this.control().value
    );
  }
}
