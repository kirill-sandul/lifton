import { Component, inject } from '@angular/core';
import { TooltipService } from '@core/services/tooltip/tooltip.service';
import {
  CdkConnectedOverlay,
  CdkOverlayOrigin,
  ConnectedPosition,
  ScrollStrategyOptions,
} from '@angular/cdk/overlay';

@Component({
  selector: 'app-tooltip',
  imports: [CdkConnectedOverlay, CdkOverlayOrigin],
  templateUrl: './tooltip.html',
  styleUrl: './tooltip.scss',
})
export class TooltipComponent {
  tooltipService = inject(TooltipService);

  protected scrollStrategy = inject(ScrollStrategyOptions).reposition({
    scrollThrottle: 0,
  });

  protected tooltipOverlayPositions: ConnectedPosition[] = [
    {
      originX: 'center', // Центр кнопки
      originY: 'top', // Верхний край кнопки
      overlayX: 'center', // Центр тултипа
      overlayY: 'bottom', // Нижний край тултипа
      offsetY: -8, // Небольшой отступ вверх, чтобы не прилипал
    },
    {
      originX: 'center',
      originY: 'bottom',
      overlayX: 'center',
      overlayY: 'top',
      offsetY: 8, // Запасная позиция снизу, если сверху нет места
    },
  ];
}
