import { Component } from '@angular/core';
import { HeaderComponent } from '@shared/components/header/header';

@Component({
  selector: 'app-dashboard-layout',
  imports: [HeaderComponent],
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.scss',
})
export class DashboardLayoutComponent {}
