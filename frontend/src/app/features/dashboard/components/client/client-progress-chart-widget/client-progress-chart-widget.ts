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

  private colorPalette: { border: string; gradientTop: string }[] = [
    { border: '#0084E2', gradientTop: 'rgba(168, 218, 255, 0.8)' },
    { border: '#E2006A', gradientTop: 'rgba(255, 168, 210, 0.8)' },
    { border: '#00B074', gradientTop: 'rgba(168, 255, 218, 0.8)' },
    { border: '#8400E2', gradientTop: 'rgba(218, 168, 255, 0.8)' },
    { border: '#E27400', gradientTop: 'rgba(255, 210, 168, 0.8)' },
  ];

  selectedExercise = signal<PcExerciseSelectorOption | null>(null);

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
      (s) => s.exerciseName === selectedExercise.value.exerciseName,
    );

    let chartDatasets: ChartDataset<'line'>[] = [];
    let labels: string[] = [];
    const labelsSetConcat = new Set<string>();

    if (selectedExercise._all_option) {
      progressChart.chartData.forEach((correspondingChartData) => {
        const chartData: ChartDataset<'line'> = {
          data: correspondingChartData ? correspondingChartData.values : [],
          label: correspondingChartData.exerciseName,
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          borderColor: (context) => {
            const safeIdx = context.datasetIndex % this.colorPalette.length;

            return this.colorPalette[safeIdx].border;
          },

          backgroundColor: (context) => {
            const ctx = context.chart?.ctx;
            if (!ctx) return;

            const safeIdx = context.datasetIndex % this.colorPalette.length;
            const colors = this.colorPalette[safeIdx];

            const gradient = ctx.createLinearGradient(0, 0, 0, 300);
            gradient.addColorStop(0, colors.gradientTop);
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

            return gradient;
          },
        };

        chartDatasets = [...chartDatasets, chartData];
        correspondingChartData.labels.forEach((label) => labelsSetConcat.add(label));

        labels = Array.from(labelsSetConcat);
      });
    } else {
      const exerciseChart = progressChartData.find(
        (exData) => exData.exerciseName === this.selectedExercise()?.value.exerciseName,
      );

      if (exerciseChart) {
        chartDatasets = [
          {
            data: exerciseChart ? exerciseChart.values : [],
            label: exerciseChart.exerciseName,
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
          },
        ];

        labels = exerciseChart.labels;
      }
    }

    return {
      labels: labels,
      datasets: chartDatasets,
    };
  });

  exerciseSelectorOptions = computed<PcExerciseSelectorOption[]>(() => {
    const progressChart = this.clientFacade.progressChart();

    if (progressChart) {
      return progressChart.chartData.map((ex) => ({
        label: ex.exerciseName,
        value: ex,
      }));
    }

    return [];
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
            return `${context.dataset.label}: ${context.formattedValue}${this.selectedExercise()?.value.exerciseUnit}`;
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
}
