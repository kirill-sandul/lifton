import { Component, inject } from '@angular/core';
import { ButtonComponent } from '@shared/components/button/button';
import { ProfileWidgetComponent } from '@shared/components/profile-widget/profile-widget';
import { UserService } from '@core/services/user/user.service';

@Component({
  selector: 'app-trainer-info-widget',
  imports: [ButtonComponent, ProfileWidgetComponent],
  templateUrl: './trainer-info-widget.html',
  styleUrl: './trainer-info-widget.scss',
})
export class TrainerInfoWidgetComponent {
  userService = inject(UserService);
  profile= this.userService.userProfile();
}
