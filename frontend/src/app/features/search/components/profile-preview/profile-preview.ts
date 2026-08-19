import { Component, input, output } from '@angular/core';
import { ButtonComponent } from '@shared/components/button/button';
import { PfpCircleComponent } from '@shared/components/pfp-circle/pfp-circle';
import { UserToInvite } from '@core/models/user.models';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile-preview',
  imports: [ButtonComponent, PfpCircleComponent, RouterLink],
  templateUrl: './profile-preview.html',
  styleUrl: './profile-preview.scss',
})
export class ProfilePreviewComponent {
  userId = input.required<string>();
  pfpUrl = input.required<string>();
  fullName = input.required<string>();
  username = input.required<string>();
  active = input.required<boolean>();

  onInvite = output<UserToInvite>();
}
