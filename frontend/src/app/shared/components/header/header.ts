import { Component, computed, HostBinding, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '@core/services/user/user.service';
import { TabsButtonComponent } from '../tabs-button/tabs-button';
import { LucideBell, LucideSun } from '@lucide/angular';
import { ScrollService } from '@core/services/scroll/scroll';
import { ProfileWidgetComponent } from '@shared/components/profile-widget/profile-widget';
import { UserRole } from '@core/models/user.models';

@Component({
  selector: 'app-header',
  imports: [RouterLink, TabsButtonComponent, LucideSun, LucideBell, ProfileWidgetComponent],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class HeaderComponent {
  userService = inject(UserService);
  scrollService = inject(ScrollService);
  profile = this.userService.userProfile();
  router = inject(Router);

  selectedTab = computed(() => {
    const currentPageUrl = this.router.url;

    const linkIndex = this.navOptions().links.findIndex((l) => l === currentPageUrl);

    return this.navOptions().labels[linkIndex];
  });
  isScrolled = computed(() => this.scrollService.isScrolled());

  clientNav = {
    labels: ['Overview', 'Start workout', 'Search trainers'],
    links: ['', '', ''],
  };

  trainerNav = {
    labels: ['Overview', 'Clients', 'Programs', 'Search clients'],
    links: ['', '', '', '/search/clients'],
  };

  navOptions = computed(() => {
    if (this.userService.userProfile()?.role === UserRole.CLIENT) return this.clientNav;
    else return this.trainerNav;
  });

  @HostBinding('class.scrolled')
  get scrolledClass() {
    return this.isScrolled();
  }
}
