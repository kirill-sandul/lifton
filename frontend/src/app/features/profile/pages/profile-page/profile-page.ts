import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@features/auth/services/auth.service';
import { UserService } from '@core/services/user.service';
import { LucideLogOut, LucidePencil } from '@lucide/angular';
import { ButtonComponent } from '@shared/components/button/button';
import { EditProfileModalComponent } from '@features/profile/components/edit-profile-modal/edit-profile-modal';
import { UserGoal, UserRole } from '@core/models/user.models';

@Component({
  selector: 'app-profile-page',
  imports: [LucidePencil, LucideLogOut, ButtonComponent, EditProfileModalComponent],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.scss',
})
export class ProfilePageComponent {
  router = inject(Router);
  authService = inject(AuthService);
  userService = inject(UserService);

  userProfile = computed(() => this.userService.userProfile());
  showEditProfileModal = signal(false);

  readonly UserRole = UserRole;
  readonly UserGoal = UserGoal;

  logout(){
    this.authService.logout().subscribe({
      next: () => this.router.navigate(['/auth'])
    });
  }
}
