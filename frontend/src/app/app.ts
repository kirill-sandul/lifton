import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SnackbarContainer } from '@shared/components/snackbar-container/snackbar-container';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SnackbarContainer],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
