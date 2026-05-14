import { Component, computed, input, signal } from '@angular/core';
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
  
  selectorStep = signal(0)
  selectionBgPos = computed(() => 100 * this.selectorStep())
}
