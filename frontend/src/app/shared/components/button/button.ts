import { Component, HostListener, input, signal } from '@angular/core';
import { LucideDynamicIcon } from '@lucide/angular';

@Component({
  selector: 'button[liftonButton], a[liftonButton]',
  imports: [LucideDynamicIcon],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class ButtonComponent {
  icon = input('');
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
