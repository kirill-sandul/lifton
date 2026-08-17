import { Component, input, output } from '@angular/core';
import { ButtonComponent } from '@shared/components/button/button';
import { PfpCircleComponent } from '@shared/components/pfp-circle/pfp-circle';
import { UserToInvite } from '@core/models/user.models';

@Component({
  selector: 'app-profile-preview',
  imports: [ButtonComponent, PfpCircleComponent],
  templateUrl: './profile-preview.html',
  styleUrl: './profile-preview.scss',
})
export class ProfilePreviewComponent {
  userId = input.required<string>();
  pfpUrl = input.required<string>();
  fullName = input.required<string>();
  email = input.required<string>();
  active = input.required<boolean>();

  onInvite = output<UserToInvite>();
}
