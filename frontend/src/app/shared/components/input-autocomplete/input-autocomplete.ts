import { Component, effect, ElementRef, inject, input, model, output, signal } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { BaseInputComponent } from '@shared/components/base-input/base-input';
import {
  AutocompleteInputList,
  AutocompleteInputListItem,
  InputType,
} from '@core/models/ui.models';

@Component({
  selector: 'app-input-autocomplete',
  imports: [BaseInputComponent, FormsModule],
  templateUrl: './input-autocomplete.html',
  styleUrl: './input-autocomplete.scss',
  host: {
    '(document:click)': 'onDocClick($event.target)',
  },
})
export class InputAutocomplete {
  private elementRef = inject(ElementRef);

  id = input('');
  name = input('');
  type = input<InputType>('text');
  placeholder = input('');
  control = input<FormControl<any>>(new FormControl());
  style = input<'outlined' | 'filled'>('outlined');

  autocompleteList = input.required<AutocompleteInputList>();

  dynamicType = signal<InputType>('text');
  showList = signal(false);
  filteredList = signal<AutocompleteInputList>([]);

  value = model<string>('');

  onPick = output<AutocompleteInputListItem>();

  constructor() {
    effect((onCleanup) => {
      const sub = this.control().valueChanges.subscribe((value) => {
        this.onTyping(value);
      });

      onCleanup(() => {
        sub.unsubscribe();
      });
    });
  }

  onTyping(value: string) {
    if (this.autocompleteList().length === 0) return;
    else if (!value.trim()) return this.showList.set(false);

    this.showList.set(true);

    this.filteredList.update((l) => [
      ...this.autocompleteList().filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase()),
      ),
    ]);
  }

  onItemSelect(item: AutocompleteInputListItem) {
    this.control().patchValue(item.name);

    this.onPick.emit(item);

    this.showList.set(false);
  }

  onDocClick(targetEl: EventTarget | null) {
    const clickedInside = this.elementRef.nativeElement.contains(targetEl);

    if (!clickedInside) {
      this.showList.set(false);
    }
  }
}
