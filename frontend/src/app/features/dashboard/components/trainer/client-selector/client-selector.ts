import { Component, input, signal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LucideArrowDown, LucideCheck } from '@lucide/angular';
import { PfpCircleComponent } from '@shared/components/pfp-circle/pfp-circle';

export interface SelectInputOption {
  clientPfpUrl: string;
  clientFirstName: string;
  value: string;
}

@Component({
  selector: 'app-client-selector',
  imports: [LucideArrowDown, LucideCheck, PfpCircleComponent],
  templateUrl: './client-selector.html',
  styleUrl: './client-selector.scss',
})
export class ClientSelectorComponent {
  control = input<FormControl<any>>(new FormControl());
  options = input.required<SelectInputOption[]>();

  isOpen = signal(false);

  get selectedOption() {
    return this.options().find((o) => o.value === this.control().value);
  }
}
