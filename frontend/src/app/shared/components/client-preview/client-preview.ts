import { Component, input } from '@angular/core';
import { ClientWorkoutOnDay } from '@core/models/training.models';
import { UserProfile } from '@core/models/user.models';

type ClientPreviewType = 'clientWithWorkout' | 'statusActivity' | 'minimalChip';

@Component({
  selector: 'app-client-preview',
  imports: [],
  templateUrl: './client-preview.html',
  styleUrl: './client-preview.scss',
})
export class ClientPreviewComponent {
  type = input<ClientPreviewType>();

  clientWithWorkout = input<ClientWorkoutOnDay>();
  clientUser = input<UserProfile>();
}
