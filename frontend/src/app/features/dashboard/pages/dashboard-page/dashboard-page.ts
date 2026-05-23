import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppLayoutComponent } from '@layouts/app-layout/app-layout';

@Component({
  selector: 'app-dashboard-page',
  imports: [AppLayoutComponent, RouterOutlet],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
})
export class DashboardPageComponent {}
