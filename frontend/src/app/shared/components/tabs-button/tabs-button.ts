import {
  Component,
  effect,
  ElementRef,
  input,
  model,
  output,
  signal,
  viewChildren,
} from '@angular/core';
import { RouterLink } from '@angular/router';

export interface TabOption {
  label: string;
  link?: string;
}

export type TabsButtonStyle = 'primary' | 'dark';

@Component({
  selector: 'app-tabs-button',
  imports: [RouterLink],
  templateUrl: './tabs-button.html',
  styleUrl: './tabs-button.scss',
})
export class TabsButtonComponent {
  options = input.required<TabOption[]>();
  defaultOption = input(0);
  style = input<TabsButtonStyle>('primary');
  noInteractive = input(false);

  onSelectOption = output<number>();

  selectorStep = model(0);

  tabElements = viewChildren('tab');
  currentTabWidth = signal(0);
  selectionBgPos = signal(0);

  constructor() {
    effect(() => {
      this.selectorStep.set(this.defaultOption());
    });

    effect(() => {
      const selectedRef = this.tabElements()[this.selectorStep()] as ElementRef;
      if (!selectedRef) return;

      const selectedElemRelPos =
        selectedRef.nativeElement.getBoundingClientRect().left -
        selectedRef.nativeElement.parentElement.getBoundingClientRect().left;

      const selectedElemWidth = selectedRef.nativeElement.getBoundingClientRect().width;

      this.currentTabWidth.set(selectedElemWidth);
      this.selectionBgPos.set(selectedElemRelPos);
    });
  }
}
