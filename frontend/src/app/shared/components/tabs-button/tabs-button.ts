import { Component, computed, input, signal } from '@angular/core';

@Component({
  selector: 'app-tabs-button',
  imports: [],
  templateUrl: './tabs-button.html',
  styleUrl: './tabs-button.scss',
})
export class TabsButtonComponent {
  options = input([''])
  
  selectorStep = signal(0)
  selectionBgClass = computed(() => `option-${this.selectorStep()}`)
}
