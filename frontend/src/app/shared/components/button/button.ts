import { Component, input } from '@angular/core';
import {
  LucidePlay,
  LucideSendHorizontal,
} from '@lucide/angular';

type IconName = 'play' | 'msg' | '';

@Component({
  selector: 'button[liftonButton], a[liftonButton]',
  imports: [LucidePlay, LucideSendHorizontal],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class ButtonComponent {
  icon = input<IconName>('');
  circular = input(false);
}
