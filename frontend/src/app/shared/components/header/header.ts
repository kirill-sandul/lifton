import { Component, computed, HostBinding, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '@core/services/user/user.service';
import { TabsButtonComponent } from '../tabs-button/tabs-button';
import { LucideBell, LucideSun } from '@lucide/angular';
import { ScrollService } from '@core/services/scroll/scroll';
import { ProfileWidgetComponent } from '@shared/components/profile-widget/profile-widget';
import { UserRole } from '@core/models/user.models';
import { NotificationsDropdownComponent } from '@features/notifications/components/notifications-dropdown/notifications-dropdown';
import { CdkConnectedOverlay, CdkOverlayOrigin } from '@angular/cdk/overlay';
import { NotificationsFacadeService } from '@features/notifications/services/notifications-facade.service';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    TabsButtonComponent,
    LucideSun,
    LucideBell,
    ProfileWidgetComponent,
    NotificationsDropdownComponent,
    CdkOverlayOrigin,
    CdkConnectedOverlay,
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class HeaderComponent {
  userService = inject(UserService);
  notificationsFacade = inject(NotificationsFacadeService);
  scrollService = inject(ScrollService);
  router = inject(Router);

  profile = this.userService.userProfile();
  notificationsLength = this.notificationsFacade.notificationsLength;

  selectedTab = computed(() => {
    const currentPageUrl = this.router.url;

    const linkIndex = this.navOptions().links.findIndex((l) => l === currentPageUrl);

    return this.navOptions().labels[linkIndex];
  });
  isScrolled = computed(() => this.scrollService.isScrolled());

  clientNav = {
    labels: ['Overview', 'Start workout', 'Search trainers'],
    links: ['', '', '/search'],
  };

  trainerNav = {
    labels: ['Overview', 'Clients', 'Programs', 'Search clients'],
    links: ['', '', '', '/search'],
  };

  navOptions = computed(() => {
    if (this.userService.role() === UserRole.CLIENT) return this.clientNav;
    else return this.trainerNav;
  });

  constructor() {
    this.notificationsFacade.getNotifications();
  }

  @HostBinding('class.scrolled')
  get scrolledClass() {
    return this.isScrolled();
  }
}
