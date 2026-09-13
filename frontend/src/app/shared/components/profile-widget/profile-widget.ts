import { Component, input } from '@angular/core';
import { LowerCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideMoveRight } from '@lucide/angular';
import { UserRolePipe } from '@core/pipes/user-role/user-role.pipe';
import { UserProfile } from '@core/models/user.models';
import { PfpCircleComponent } from '@shared/components/pfp-circle/pfp-circle';

type ProfileWidgetColor = 'light' | 'dark';

@Component({
  selector: 'app-profile-widget',
  imports: [LowerCasePipe, LucideMoveRight, UserRolePipe, PfpCircleComponent, RouterLink],
  templateUrl: './profile-widget.html',
  styleUrl: './profile-widget.scss',
})
export class ProfileWidgetComponent {
  profile = input<UserProfile>();
  color = input<ProfileWidgetColor>('light');
}
