import { Component, inject, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith } from 'rxjs';
import { TabsButtonComponent } from '@shared/components/tabs-button/tabs-button';

@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet, TabsButtonComponent],
  templateUrl: './auth-layout.html',
  styleUrl: './auth-layout.scss',
  encapsulation: ViewEncapsulation.Emulated
})
export class AuthLayoutComponent {
  private router = inject(Router);

  selectedTab = toSignal(
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      startWith(null),
      map(() => this.router.url.includes('register')  ? 'Join Lifton' : 'Sign in')
    )
  )
}
