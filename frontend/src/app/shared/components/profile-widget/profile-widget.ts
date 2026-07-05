import { Component, input } from '@angular/core';
import { LowerCasePipe } from '@angular/common';
import { LucideMoveRight } from '@lucide/angular';
import { UserRolePipe } from '@core/pipes/user-role/user-role.pipe';
import { UserProfile } from '@core/models/user.models';
import { PfpCircleComponent } from '@shared/components/pfp-circle/pfp-circle';

type ProfileWidgetColor = 'light' | 'dark';

@Component({
  selector: 'app-profile-widget',
  imports: [LowerCasePipe, LucideMoveRight, UserRolePipe, PfpCircleComponent],
  templateUrl: './profile-widget.html',
  styleUrl: './profile-widget.scss',
})
export class ProfileWidgetComponent {
  profile = input<UserProfile>();
  color = input<ProfileWidgetColor>('light');
}
