import { Component, inject, signal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { UserService } from '@core/services/user.service';
import { TabsButtonComponent } from '../tabs-button/tabs-button';
import { UserRolePipe } from '@core/pipes/user-role.pipe';
import { LucideBell, LucideMail, LucideSun, LucideMoveRight } from "@lucide/angular";
import { LowerCasePipe } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink, TabsButtonComponent, UserRolePipe, LowerCasePipe, LucideSun, LucideBell, LucideMail, LucideMoveRight],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class HeaderComponent {
  userService = inject(UserService);
  profile = this.userService.userProfile();

  selectedTab = signal('Overview')
}
