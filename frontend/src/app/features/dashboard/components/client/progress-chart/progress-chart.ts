import { Component, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-progress-chart',
  imports: [BaseChartDirective],
  templateUrl: './progress-chart.html',
  styleUrl: './progress-chart.scss',
})
export class ProgressChartComponent {
  lineChartType: 'line' = 'line';

  lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        data: [60, 70, 73, 80],
        label: 'Bench Press',
        tension: 0.4,
      },
    ],
  };

  lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  ngAfterViewInit() {
    const ctx = this.chart?.chart?.ctx;

    if(!ctx) return;

    const gradient = ctx.createLinearGradient(0, 0, 0, 300);

    gradient.addColorStop(0, 'rgba(168, 218, 255, 0.8)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

    this.lineChartData.datasets[0].backgroundColor = gradient;
    this.lineChartData.datasets[0].fill = true;
  }
}
