import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { ButtonComponent } from '@shared/components/button/button';
import { LucideMoveRight } from '@lucide/angular';
import { Workout } from '@core/models/training.models';
import { ClientService } from '@core/services/roles/client/client.service';

@Component({
  selector: 'app-workout-widget',
  imports: [RouterLink, ButtonComponent, TitleCasePipe, LucideMoveRight],
  templateUrl: './workout-widget.html',
  styleUrl: './workout-widget.scss',
})
export class WorkoutWidgetComponent {
  clientService = inject(ClientService);
  workout = computed<Workout | undefined>(
    () => this.clientService.dashboardData()?.upcomingWorkoutWidget,
  );
}
