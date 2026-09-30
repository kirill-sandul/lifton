import { Component, input, output } from '@angular/core';
import { ClientWorkoutOnDay } from '@core/api-contract/dashboard.api';
import { ClientPreviewComponent } from '@shared/components/client-preview/client-preview';
import { WorkoutDetails } from '@shared/components/workout-details/workout-details';

@Component({
  selector: 'app-trainer-workouts-details',
  imports: [ClientPreviewComponent, WorkoutDetails],
  templateUrl: './trainer-workouts-details.html',
  styleUrl: './trainer-workouts-details.scss',
})
export class TrainerWorkoutsDetails {
  workoutsData = input.required<ClientWorkoutOnDay[] | null>();

  selectedWorkout = input.required<ClientWorkoutOnDay | null>();

  onSelectWorkout = output<ClientWorkoutOnDay>();
}
