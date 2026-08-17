import { Injectable, signal } from '@angular/core';

export interface ITooltip {
  text: string;
  targetElem: HTMLElement;
}

@Injectable({
  providedIn: 'root',
})
export class TooltipService {
  tooltip = signal<ITooltip | null>(null);
  animationTimeout = setTimeout(() => {});

  showTooltip({ text, targetElem }: ITooltip) {
    this.tooltip.set({ text, targetElem });
  }

  hideTooltip() {
    if (this.animationTimeout) {
      clearTimeout(this.animationTimeout);
    }

    this.tooltip.set(null);
  }
}
