import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@features/auth/services/auth.service';
import { UserService } from '@core/services/user/user.service';
import { LucideLogOut, LucidePencil } from '@lucide/angular';
import { ButtonComponent } from '@shared/components/button/button';
import { EditProfileModalComponent } from '@features/profile/components/edit-profile-modal/edit-profile-modal';
import { EditPfpModalComponent } from '@features/profile/components/edit-pfp-modal/edit-pfp-modal';
import { UserGoal, UserProfile, UserRole } from '@core/models/user.models';
import { UserGoalPipe } from '@core/pipes/user-goal/user-goal.pipe';

@Component({
  selector: 'app-profile-page',
  imports: [
    LucidePencil,
    LucideLogOut,
    ButtonComponent,
    EditProfileModalComponent,
    EditPfpModalComponent,
    UserGoalPipe,
  ],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.scss',
})
export class ProfilePageComponent {
  private readonly route = inject(ActivatedRoute);

  router = inject(Router);
  authService = inject(AuthService);
  userService = inject(UserService);

  profile = signal<UserProfile | null>(null);

  isOwnProfile = computed(() => {
    const currUser = this.userService.userProfile();

    return !!this.profile() && this.profile()?.id === currUser?.id;
  });

  showEditProfileModal = signal(false);
  showEditPfpModal = signal(false);

  readonly UserRole = UserRole;
  readonly UserGoal = UserGoal;

  ngOnInit() {
    this.route.paramMap.subscribe(() => this.loadProfile());
  }

  loadProfile() {
    const routeId = this.route.snapshot.paramMap.get('id');

    if (!routeId) {
      this.router.navigate(['/']);
      return;
    }

    this.userService.getProfileById(routeId).subscribe({
      next: (profile: UserProfile) => this.profile.set(profile),
      error: () => this.router.navigate(['/']),
    });
  }

  getTrainerName() {
    return this.profile()?.clientProfile?.assignedTrainer.fullName ?? 'No trainer';
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => this.router.navigate(['/auth']),
    });
  }
}
