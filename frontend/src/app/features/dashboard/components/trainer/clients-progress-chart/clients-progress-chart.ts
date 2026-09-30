import { Component, computed, inject, signal } from '@angular/core';
import { ChartConfiguration, ChartDataset, ChartOptions } from 'chart.js';
import { TrainerFacade } from '@core/facades/roles/trainer/trainer.facade';
import { ClientSelectorComponent, ClientSelectorOption } from '../client-selector/client-selector';
import { ProgressChartExerciseSelector } from '@shared/components/exercise-selector/exercise-selector';
import { PcExerciseSelectorOption } from '@core/models/ui.models';
import { ClientProgressData } from '@core/api-contract/dashboard.api';
import { ProgressChartComponent } from '@shared/components/progress-chart/progress-chart';

@Component({
  selector: 'app-clients-progress-chart-widget',
  imports: [ClientSelectorComponent, ProgressChartExerciseSelector, ProgressChartComponent],
  templateUrl: './clients-progress-chart.html',
  styleUrl: './clients-progress-chart.scss',
})
export class ClientsProgressChartComponent {
  trainerFacade = inject(TrainerFacade);

  clients = computed(() => this.trainerFacade.clients());

  selectedClientId = signal<string | null>(null);
  selectedExerciseOption = signal<PcExerciseSelectorOption | null>(null);
  selectedClientChartData = computed<ClientProgressData | null | undefined>(() => {
    const progressChartData = this.trainerFacade.allClientsProgressWidget();

    return progressChartData
      ? progressChartData.find((v) => v.clientData.id === this.selectedClientId())
      : null;
  });

  selectedClientName = computed<string | null>(() => {
    const selectedClientChartData = this.selectedClientChartData();
    return selectedClientChartData ? selectedClientChartData.clientData.fullName : null;
  });

  generatedExercisesOptions = computed<PcExerciseSelectorOption[]>(() => {
    const selectedChartData = this.selectedClientChartData();

    const options: PcExerciseSelectorOption[] = [];

    if (selectedChartData) {
      selectedChartData.chartData.forEach((exData) => {
        options.push({
          label: exData.exerciseName,
          value: exData,
        });
      });
    }

    return options;
  });

  generateClientsOptions = computed<ClientSelectorOption[]>(() => {
    const options: ClientSelectorOption[] = [];

    this.clients().forEach((client) => {
      const firstName = client.user.fullName.split(' ')[0];

      options.push({
        clientPfpUrl: client.user.pfpUrl!,
        clientFirstName: firstName,
        value: client.id,
      });
    });

    return options;
  });

  lineChartData = computed<ChartConfiguration<'line'>['data']>(() => {
    const progressChartData = this.trainerFacade.allClientsProgressWidget();

    const selectedChartData = this.selectedClientChartData();
    const selectedExerciseOption = this.selectedExerciseOption();

    if (!progressChartData || !selectedChartData || !selectedExerciseOption) {
      return {
        labels: [],
        datasets: [],
      };
    }

    let chartDatasets: ChartDataset<'line'>[] = [];
    let labels: string[] = [];
    const labelsSetConcat = new Set<string>();

    if (selectedExerciseOption._all_option) {
      selectedChartData.chartData.forEach((correspondingChartData) => {
        const chartData: ChartDataset<'line'> = {
          data: correspondingChartData ? correspondingChartData.values : [],
          label: correspondingChartData.exerciseName,
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

        chartDatasets = [...chartDatasets, chartData];
        correspondingChartData.labels.forEach((label) => labelsSetConcat.add(label));

        labels = Array.from(labelsSetConcat);

        console.log(correspondingChartData);
      });
    } else {
      const exerciseChart = selectedChartData.chartData.find(
        (exData) => exData.exerciseName === this.selectedExerciseOption()?.value.exerciseName,
      );

      console.log(this.selectedExerciseOption());

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
}
