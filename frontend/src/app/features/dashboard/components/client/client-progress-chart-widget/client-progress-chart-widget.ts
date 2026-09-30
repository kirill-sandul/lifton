import { Component, computed, inject, signal } from '@angular/core';
import { ChartConfiguration, ChartDataset, ChartOptions } from 'chart.js';
import { ClientFacade } from '@core/facades/roles/client/client.facade';
import { ProgressChartExerciseSelector } from '@shared/components/exercise-selector/exercise-selector';
import { PcExerciseSelectorOption } from '@core/models/ui.models';
import { ProgressChartDataset } from '@core/api-contract/dashboard.api';
import { ProgressChartComponent } from '@shared/components/progress-chart/progress-chart';

@Component({
  selector: 'app-client-progress-chart-widget',
  imports: [ProgressChartExerciseSelector, ProgressChartComponent],
  templateUrl: './client-progress-chart-widget.html',
  styleUrl: './client-progress-chart-widget.scss',
})
export class ClientProgressChartWidgetComponent {
  clientFacade = inject(ClientFacade);

  selectedExercise = signal<ProgressChartDataset | null>(null);

  lineChartData = computed<ChartConfiguration<'line'>['data']>(() => {
    const progressChart = this.clientFacade.progressChart();
    const progressChartData = progressChart?.chartData;

    const selectedExercise = this.selectedExercise();

    if (!progressChartData || !selectedExercise)
      return {
        labels: [],
        datasets: [],
      };

    const correspondingChartData = progressChartData.find(
      (s) => s.exerciseName === selectedExercise?.exerciseName,
    );

    const chartData: ChartDataset<'line'> = {
      data: correspondingChartData ? correspondingChartData.values : [],
      label: selectedExercise.exerciseName,
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

    return {
      labels: correspondingChartData ? correspondingChartData.labels : [],
      datasets: [chartData],
    };
  });

  lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return `${context.dataset.label}: ${context.formattedValue}${this.selectedExercise()?.exerciseUnit}`;
          },
        },
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

  get exerciseSelectorOptions(): PcExerciseSelectorOption[] {
    const progressChart = this.clientFacade.progressChart();

    if (progressChart && progressChart.chartData.length > 0) {
      return progressChart.chartData.map((ex) => ({
        label: ex.exerciseName,
        value: ex,
      }));
    }

    return [];
  }
}
