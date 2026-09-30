import { Component, input } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { LucideDynamicIcon } from '@lucide/angular';
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-progress-chart',
  imports: [BaseChartDirective, LucideDynamicIcon],
  templateUrl: './progress-chart.html',
  styleUrl: './progress-chart.scss',
})
export class ProgressChartComponent {
  lineChartType: 'line' = 'line';

  chartData = input<ChartConfiguration<'line'>['data']>();
  chartOptions = input<ChartOptions<'line'>>();
  noProgressMessage = input<string>('No data to analyze yet');
}
