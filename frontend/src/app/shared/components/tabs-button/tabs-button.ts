import { Component, computed, effect, input, signal } from '@angular/core';
import { RouterLink } from "@angular/router";

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
  
  selectorStep = signal(0)
  selectionBgPos = computed(() => 100 * this.selectorStep())

  constructor(){
    effect(() => {
      let selectedOptionIdx = this.options().findIndex(o => o == this.selectedOption());
      if(selectedOptionIdx == -1) selectedOptionIdx = 0;

      this.selectorStep.set(selectedOptionIdx);
    })
  }
}
