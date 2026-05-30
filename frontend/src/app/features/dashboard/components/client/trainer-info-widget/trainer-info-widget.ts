import { Component, computed, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ButtonComponent } from '@shared/components/button/button';
import { ProfileWidgetComponent } from '@shared/components/profile-widget/profile-widget';
import { UserService } from '@core/services/user/user.service';
import { LucideArrowUpRight } from '@lucide/angular';

@Component({
  selector: 'app-trainer-info-widget',
  imports: [ButtonComponent, ProfileWidgetComponent, DatePipe, LucideArrowUpRight],
  templateUrl: './trainer-info-widget.html',
  styleUrl: './trainer-info-widget.scss',
})
export class TrainerInfoWidgetComponent {
  userService = inject(UserService);
  trainerUser = computed(() => {
    const currentUser = this.userService.userProfile();

    return currentUser?.clientProfile!.assignedTrainer;
  });
  clientUser = this.userService.userProfile();
}
