import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { ButtonComponent } from '@shared/components/button/button';
import { LucideMoveRight } from '@lucide/angular';
import { Workout } from '@core/models/training.models';
import { DashboardService } from '@features/dashboard/services/dashboard.service';

@Component({
  selector: 'app-workout-widget',
  imports: [RouterLink, ButtonComponent, TitleCasePipe, LucideMoveRight],
  templateUrl: './workout-widget.html',
  styleUrl: './workout-widget.scss',
})
export class WorkoutWidgetComponent {
  dashboardService = inject(DashboardService);
  workout: Workout = this.dashboardService.programSchedule[0];
}
