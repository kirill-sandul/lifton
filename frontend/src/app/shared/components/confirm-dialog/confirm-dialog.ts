import { Component, input, output } from '@angular/core';
import { CdkConnectedOverlay, CdkOverlayOrigin, ConnectedPosition } from '@angular/cdk/overlay';

@Component({
  selector: 'app-confirm-dialog',
  imports: [CdkConnectedOverlay],
  templateUrl: './confirm-dialog.html',
  styleUrl: './confirm-dialog.scss',
})
export class ConfirmDialogComponent {
  confirmText = input.required<string>();
  cdkOrigin = input.required<CdkOverlayOrigin>();
  cdkOpen = input.required<boolean>();

  onApprove = output();
  onDismiss = output();

  confirmDialogPositions: ConnectedPosition[] = [
    {
      originX: 'center',
      originY: 'bottom',
      overlayX: 'center',
      overlayY: 'top',
      offsetY: 5,
    },
  ];
}
