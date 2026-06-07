import { Component, computed, effect, ElementRef, input, signal, viewChildren } from '@angular/core';
import { RouterLink } from "@angular/router";

export type TabsButtonStyle = 'primary' | 'dark';

@Component({
  selector: 'app-tabs-button',
  imports: [RouterLink],
  templateUrl: './tabs-button.html',
  styleUrl: './tabs-button.scss',
})
export class TabsButtonComponent {
  options = input([''])
  optionsLinks = input([''])
  selectedOption = input('')
  style = input<TabsButtonStyle>('primary');

  selectorStep = signal(0)

  tabElements = viewChildren('tab')
  currentTabWidth = signal(0)
  selectionBgPos = signal(0)

  constructor(){
    effect(() => {
      let selectedOptionIdx = this.options().findIndex(o => o == this.selectedOption());
      if(selectedOptionIdx == -1) selectedOptionIdx = 0;

      this.selectorStep.set(selectedOptionIdx);
    })

    effect(() => {
      const selectedRef = this.tabElements()[this.selectorStep()] as ElementRef;
      if(!selectedRef) return;

      const selectedElemRelPos = selectedRef.nativeElement.getBoundingClientRect().left - selectedRef.nativeElement.parentElement.getBoundingClientRect().left;

      const selectedElemWidth = selectedRef.nativeElement.getBoundingClientRect().width;

      this.currentTabWidth.set(selectedElemWidth)
      this.selectionBgPos.set(selectedElemRelPos)
    })
  }
}
