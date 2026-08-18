import { Injectable, signal } from '@angular/core';

export interface SnackbarState {
  show: boolean;
  message: string | null;
  status: SnackbarStatus | null;
}

export type SnackbarStatus = 'success' | 'error' | 'info';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  private _snackbarState = signal<SnackbarState>({
    show: false,
    status: null,
    message: null,
  });
  readonly snackbarState = this._snackbarState.asReadonly();

  autoHideTimeout = setTimeout(() => {});

  newSnackbar(message: string, status: SnackbarStatus) {
    clearTimeout(this.autoHideTimeout);

    if (this._snackbarState().show) {
      this.closeSnackbar();

      setTimeout(() => {
        this._snackbarState.set({
          show: true,
          status,
          message,
        });
      }, 100);

      this.autoHideTimeout = setTimeout(() => {
        this.closeSnackbar();
      }, 2300);

      return;
    }

    this._snackbarState.set({
      show: true,
      status,
      message,
    });

    this.autoHideTimeout = setTimeout(() => {
      this.closeSnackbar();
    }, 2000);
  }

  closeSnackbar() {
    this._snackbarState.set({
      show: false,
      status: null,
      message: null,
    });
  }
}
