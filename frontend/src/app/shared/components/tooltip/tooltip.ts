import { Component, effect, ElementRef, input, signal, viewChild } from '@angular/core';
import { ITooltip } from '@core/services/tooltip/tooltip';

@Component({
  selector: 'app-tooltip',
  imports: [],
  templateUrl: './tooltip.html',
  styleUrl: './tooltip.scss',
})
export class TooltipComponent {
  tooltip = input.required<ITooltip>();

  topPos = signal(0);
  leftPos = signal(0);
  tooltipWidth = signal(0);

  tooltipRef = viewChild<ElementRef>('tooltipRef');

  constructor() {
    // afterNextRender(() => {
    //   // this.tooltipWidth.set(this.tooltipRef()?.nativeElement.getBoundingClientRect().width);
    // });
    effect(() => {
      console.log(this.tooltip().targetElem.getBoundingClientRect().left);
      this.topPos.set(this.tooltip().targetElem.getBoundingClientRect().bottom + 5);
      this.leftPos.set(this.tooltip().targetElem.getBoundingClientRect().left);
    });
  }
}
