import { Component, HostBinding, HostListener, input, signal } from '@angular/core';
import { LucideArrowUpRight, LucidePlay, LucideSend } from '@lucide/angular';

type IconName = 'play' | 'msg' | 'arrowUp' | '';

@Component({
  selector: 'button[liftonButton], a[liftonButton]',
  imports: [LucidePlay, LucideSend, LucideArrowUpRight],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class ButtonComponent {
  icon = input<IconName>('');
  circular = input(false);
  tooltip = input<string>();

  showTooltip = signal(false);

  @HostListener('mouseenter')
  onHover() {
    this.showTooltip.set(true);
  }

  @HostListener('mouseleave')
  onLeave() {
    this.showTooltip.set(false);
  }
}
