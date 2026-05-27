import { Component, computed, effect, HostBinding, inject, signal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { UserService } from '@core/services/user/user.service';
import { TabsButtonComponent } from '../tabs-button/tabs-button';
import { UserRolePipe } from '@core/pipes/user-role.pipe';
import { LucideBell, LucideMail, LucideSun, LucideMoveRight } from "@lucide/angular";
import { LowerCasePipe } from '@angular/common';
import { ScrollService } from '@core/services/scroll/scroll';
import { ProfileWidgetComponent } from '@shared/components/profile-widget/profile-widget';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    TabsButtonComponent,
    LucideSun,
    LucideBell,
    LucideMail,
    ProfileWidgetComponent,
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class HeaderComponent {
  userService = inject(UserService);
  scrollService = inject(ScrollService);
  profile = this.userService.userProfile();

  selectedTab = signal('Overview');
  isScrolled = computed(() => this.scrollService.isScrolled());

  @HostBinding('class.scrolled')
  get scrolledClass() {
    return this.isScrolled();
  }
}
