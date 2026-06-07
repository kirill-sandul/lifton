import { Component, computed, inject } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartDataset, ChartOptions } from 'chart.js';
import { TrainerService } from '@core/services/roles/trainer/trainer.service';
import { FormControl } from '@angular/forms';
import { ClientSelectorComponent, SelectInputOption } from '../client-selector/client-selector';

@Component({
  selector: 'app-clients-progress-chart',
  imports: [BaseChartDirective, ClientSelectorComponent],
  templateUrl: './clients-progress-chart.html',
  styleUrl: './clients-progress-chart.scss',
})
export class ClientsProgressChartComponent {
  trainerService = inject(TrainerService);
  clients = computed(() => this.trainerService.clients());

  lineChartType: 'line' = 'line';

  chartData: ChartDataset<'line'> = {
    data: [60, 70, 73, 80],
    label: 'Bench Press',
    borderColor: '#0084E2',
    borderWidth: 2,
    fill: true,
    tension: 0.4,
    backgroundColor: (context) => {
      const ctx = context.chart?.ctx;

      if (!ctx) return;

      const gradient = ctx.createLinearGradient(0, 0, 0, 300);

      gradient.addColorStop(0, 'rgba(168, 218, 255, 0.8)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

      return gradient;
    },
  };

  lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [this.chartData],
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

  selectClientControl = new FormControl(this.clients().length ? this.clients()[0].id : '');

  generateClientsOptions() {
    const options: SelectInputOption[] = [];

    this.clients().forEach((client) => {
      const firstName = client.fullName.split(' ')[0];

      options.push({
        clientPfpUrl: client.pfpUrl!,
        clientFirstName: firstName,
        value: client.id!,
      });
    });

    return options;
  }
}
