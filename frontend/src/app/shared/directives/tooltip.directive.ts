import { Directive, ElementRef, inject, input } from '@angular/core';
import { TooltipService } from '@core/services/tooltip/tooltip.service';
import { CdkOverlayOrigin } from '@angular/cdk/overlay';

@Directive({
  selector: '[appTooltip]',
  host: {
    '(mouseenter)': 'onMouseenter()',
    '(mouseleave)': 'onMouseleave()',
  },
})
export class TooltipDirective extends CdkOverlayOrigin {
  private el = inject(ElementRef);

  tooltipService = inject(TooltipService);

  appTooltip = input.required<string>();

  onMouseenter() {
    const overlayOrigin = new CdkOverlayOrigin(this.el);
    this.tooltipService.showTooltip(this.appTooltip(), this.el.nativeElement);
  }

  onMouseleave() {
    this.tooltipService.hideTooltip();
  }
}
