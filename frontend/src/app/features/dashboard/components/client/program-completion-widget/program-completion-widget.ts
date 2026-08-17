import { Component } from '@angular/core';
import { ProgressBarComponent } from '@shared/components/progress-bar/progress-bar';

@Component({
  selector: 'app-program-completion-widget',
  imports: [ProgressBarComponent],
  templateUrl: './program-completion-widget.html',
  styleUrl: './program-completion-widget.scss',
})
export class CompletionWidgetComponent {}
