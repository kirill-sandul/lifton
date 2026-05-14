import { Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { TabsButtonComponent } from '@shared/components/tabs-button/tabs-button';

@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet, TabsButtonComponent],
  templateUrl: './auth-layout.html',
  styleUrl: './auth-layout.scss',
  encapsulation: ViewEncapsulation.Emulated
})
export class AuthLayoutComponent {}
