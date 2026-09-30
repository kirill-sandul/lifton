import { Component, input, output, signal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LucideArrowDown, LucideCheck } from '@lucide/angular';
import { PfpCircleComponent } from '@shared/components/pfp-circle/pfp-circle';

export interface ClientSelectorOption {
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
  control = new FormControl();
  options = input.required<ClientSelectorOption[]>();

  isOpen = signal(false);

  onSelect = output<string>();

  get selectedOption() {
    const toSelect = this.options().find((o) => o.value === this.control.value);

    if (toSelect) {
      this.control.setValue(toSelect.value);
      this.onSelect.emit(toSelect.value);
      return toSelect;
    } else {
      this.control.setValue(this.options()[0].value);
      this.onSelect.emit(this.options()[0].value);
      return this.options()[0];
    }
  }

  onOptionSelect(option: ClientSelectorOption) {
    this.control.setValue(option.value);
    this.isOpen.set(false);
    this.onSelect.emit(option.value);
  }
}
