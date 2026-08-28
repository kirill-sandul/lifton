import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { ButtonComponent } from '@shared/components/button/button';
import { LucideMoveRight } from '@lucide/angular';
import { ClientService } from '@core/services/roles/client/client.service';
import { WorkoutResponse } from '@core/api-contract/training.api';

@Component({
  selector: 'app-workout-widget',
  imports: [RouterLink, ButtonComponent, TitleCasePipe, LucideMoveRight],
  templateUrl: './workout-widget.html',
  styleUrl: './workout-widget.scss',
})
export class WorkoutWidgetComponent {
  clientService = inject(ClientService);
  workout = computed<WorkoutResponse | undefined>(
    () => this.clientService.dashboardData()?.upcomingWorkoutWidget,
  );
}
