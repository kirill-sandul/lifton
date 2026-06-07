import { Injectable, signal } from '@angular/core';
import { TimerHandle } from 'rxjs/internal/scheduler/timerHandle';

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
    // if (this.tooltip()) {
    //   setTimeout(() => {
    //     this.tooltip.set({ text, targetElem });
    //   }, 1000);
    // } else
    console.log(targetElem);
    this.tooltip.set({ text, targetElem });
  }

  hideTooltip() {
    if (this.animationTimeout) {
      clearTimeout(this.animationTimeout);
    }

    this.tooltip.set(null);
  }
}
