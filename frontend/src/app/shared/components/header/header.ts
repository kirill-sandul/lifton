import { Component, computed, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { UserService } from '@core/services/user/user.service';
import { TabOption, TabsButtonComponent } from '../tabs-button/tabs-button';
import { ProfileWidgetComponent } from '@shared/components/profile-widget/profile-widget';
import { UserRole } from '@core/models/user.models';
import { NotificationsDropdownComponent } from '@features/notifications/components/notifications-dropdown/notifications-dropdown';
import { CdkConnectedOverlay, CdkOverlayOrigin } from '@angular/cdk/overlay';
import { NotificationsFacade } from '@features/notifications/facade/notifications.facade';
import { LucideDynamicIcon } from '@lucide/angular';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
  router = inject(Router);
  userService = inject(UserService);
  notificationsFacade = inject(NotificationsFacade);

  profile = this.userService.userProfile();
  notificationsLength = this.notificationsFacade.notificationsLength;

  selectedTab = signal<number>(0);

  profileUrl = computed(() => {
    const username = this.userService.userProfile()?.username;

    return `/profile/${username}`;
  });
  profileBadgeSelected = signal(false);

  clientNav: TabOption[] = [
    {
      label: 'Overview',
      link: '/',
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
      link: '/',
    },
    {
      label: 'Clients',
      link: '',
    },
    {
      label: 'Programs',
      link: '/programs',
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

    this.router.events.pipe(takeUntilDestroyed()).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentPageUrl = event.url;
        const correspondingTabIndex = this.navOptions().findIndex(
          (opt) => opt.link === currentPageUrl,
        );

        this.selectedTab.set(correspondingTabIndex);

        if (
          correspondingTabIndex === -1 &&
          event.url.toLowerCase() === this.profileUrl().toLowerCase()
        ) {
          this.profileBadgeSelected.set(true);

          return;
        }

        this.profileBadgeSelected.set(false);
      }
    });
  }
}
