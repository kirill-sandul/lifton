import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserProfile } from '@core/models/user.models';
import { PfpCircleComponent } from '@shared/components/pfp-circle/pfp-circle';
import { ClientWorkoutOnDay } from '@core/api-contract/dashboard.api';

type ClientPreviewType = 'clientWithWorkout' | 'statusActivity' | 'minimalChip';

@Component({
  selector: 'app-client-preview',
  imports: [PfpCircleComponent, RouterLink],
  templateUrl: './client-preview.html',
  styleUrl: './client-preview.scss',
})
export class ClientPreviewComponent {
  type = input<ClientPreviewType>();
  noRedirect = input<boolean>();

  clientWithWorkout = input<ClientWorkoutOnDay>();
  clientUser = input<UserProfile>();
}
