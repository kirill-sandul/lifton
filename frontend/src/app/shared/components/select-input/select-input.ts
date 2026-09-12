import { Component, ElementRef, inject, input, signal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LucideArrowDown, LucideCheck } from '@lucide/angular';
import { SelectInputOption } from '@core/models/ui.models';

@Component({
  selector: 'app-select-input',
  imports: [LucideArrowDown, LucideCheck],
  templateUrl: './select-input.html',
  styleUrl: './select-input.scss',
  host: {
    '(document:click)': 'onDocClick($event.target)',
  },
})
export class SelectInputComponent {
  private elementRef = inject(ElementRef);

  name = input('');
  control = input<FormControl<any>>(new FormControl());
  options = input.required<SelectInputOption[]>();
  compact = input<boolean>(false);
  placeholder = input<string>('');

  isOpen = signal(false);

  get selectedOption() {
    let controlValue = this.control().value;

    if (!controlValue && !this.placeholder()) {
      controlValue = this.options()[0].value;
    }

    return this.options().find((o) => o.value === controlValue);
  }

  get errorMessage(): string {
    const errors = this.control().errors;

    if (errors && errors['required']) return `${this.name()} is required`;
    else if (errors) return 'Invalid selection';

    return '';
  }

  onDocClick(targetEl: EventTarget | null) {
    const clickedInside = this.elementRef.nativeElement.contains(targetEl);

    if (!clickedInside) {
      this.isOpen.set(false);
      this.control().markAsTouched();
    }
  }
}
