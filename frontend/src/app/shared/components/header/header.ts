import { Component, computed, HostBinding, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '@core/services/user/user.service';
import { TabOption, TabsButtonComponent } from '../tabs-button/tabs-button';
import { ScrollService } from '@core/services/scroll/scroll';
import { ProfileWidgetComponent } from '@shared/components/profile-widget/profile-widget';
import { UserRole } from '@core/models/user.models';
import { NotificationsDropdownComponent } from '@features/notifications/components/notifications-dropdown/notifications-dropdown';
import { CdkConnectedOverlay, CdkOverlayOrigin } from '@angular/cdk/overlay';
import { NotificationsFacade } from '@features/notifications/facade/notifications.facade';
import { LucideDynamicIcon } from '@lucide/angular';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    TabsButtonComponent,
    ProfileWidgetComponent,
    NotificationsDropdownComponent,
    CdkOverlayOrigin,
    CdkConnectedOverlay,
    LucideDynamicIcon,
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class HeaderComponent {
  userService = inject(UserService);
  notificationsFacade = inject(NotificationsFacade);
  scrollService = inject(ScrollService);
  router = inject(Router);

  profile = this.userService.userProfile();
  notificationsLength = this.notificationsFacade.notificationsLength;

  selectedTab = computed(() => {
    const currentPageUrl = this.router.url;

    return this.navOptions().findIndex((opt) => opt.link === currentPageUrl);
  });
  isScrolled = computed(() => this.scrollService.isScrolled());

  clientNav: TabOption[] = [
    {
      label: 'Overview',
      link: '/dashboard',
    },
    {
      label: 'Start workout',
      link: '',
    },
    {
      label: 'Search trainers',
      link: '/search',
    },
  ];

  trainerNav: TabOption[] = [
    {
      label: 'Overview',
      link: '/dashboard',
    },
    {
      label: 'Clients',
      link: '',
    },
    {
      label: 'Programs',
      link: '',
    },
    {
      label: 'Search',
      link: '/search',
    },
  ];

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
