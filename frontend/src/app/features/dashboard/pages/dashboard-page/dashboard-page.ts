import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardLayoutComponent } from '@layouts/dashboard-layout/dashboard-layout';

@Component({
  selector: 'app-dashboard-page',
  imports: [DashboardLayoutComponent, RouterOutlet],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
})
export class DashboardPageComponent {
  ngOnInit(){
    document.body.classList.add('dashboard-bg');
  }

  ngOnDestroy(){
    document.body.classList.remove('dashboard-bg');
  }
}
