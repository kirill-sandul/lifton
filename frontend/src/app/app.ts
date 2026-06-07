import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TooltipService } from '@core/services/tooltip/tooltip';
import { TooltipComponent } from '@shared/components/tooltip/tooltip';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TooltipComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  tooltipService = inject(TooltipService);
}
