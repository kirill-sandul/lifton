import { Component, inject } from '@angular/core';
import { LucideCheck, LucideCircleAlert, LucideCircleX } from '@lucide/angular';
import { SnackbarService } from '@core/services/snackbar/snackbar.service';

@Component({
  selector: 'app-snackbar-container',
  imports: [LucideCheck, LucideCircleAlert, LucideCircleX],
  templateUrl: './snackbar-container.html',
  styleUrl: './snackbar-container.scss',
})
export class SnackbarContainer {
  snackbarService = inject(SnackbarService);
}
