import { Directive, HostListener, inject, input } from '@angular/core';
import { TooltipService } from '@core/services/tooltip/tooltip';

@Directive({
  selector: '[appTooltip]',
})
export class TooltipDirective {
  tooltipService = inject(TooltipService);

  appTooltip = input.required<string>();

  @HostListener('mouseenter', ['$event'])
  onMouseenter(event: MouseEvent) {
    const focusElement = event.target as HTMLElement;

    this.tooltipService.showTooltip({
      text: this.appTooltip(),
      targetElem: focusElement,
    });
  }

  @HostListener('mouseleave')
  onMouseleave() {
    this.tooltipService.hideTooltip();
  }
}
