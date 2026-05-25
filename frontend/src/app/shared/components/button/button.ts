import { Component, input } from '@angular/core';
import { LucidePlay } from '@lucide/angular';

type IconName = 'play' | 'msg' | '';

@Component({
  selector: 'button, a[liftonButton]',
  imports: [LucidePlay],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class ButtonComponent {
  icon = input<IconName>('')
}
