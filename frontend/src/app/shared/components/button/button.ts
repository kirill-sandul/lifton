import { Component, input } from '@angular/core';
import {
  LucideMailPlus,
  LucidePlay,
  LucideSend,
  LucideSendHorizonal,
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
}
