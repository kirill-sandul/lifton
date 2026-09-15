import { Injectable, signal } from '@angular/core';
import { CdkOverlayOrigin } from '@angular/cdk/overlay';

export interface TooltipData {
  text: string;
  origin: CdkOverlayOrigin;
}

@Injectable({
  providedIn: 'root',
})
export class TooltipService {
  tooltip = signal<TooltipData | null>(null);

  showTooltip(text: string, origin: CdkOverlayOrigin) {
    this.tooltip.set({ text, origin });
  }

  hideTooltip() {
    this.tooltip.set(null);
  }
}
