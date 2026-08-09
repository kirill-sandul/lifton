import { Component, input, signal } from '@angular/core';
import { LucideDynamicIcon } from '@lucide/angular';

@Component({
  selector: 'app-week-dropdown',
  imports: [LucideDynamicIcon],
  templateUrl: './week-dropdown.html',
  styleUrl: './week-dropdown.scss',
})
export class WeekDropdownComponent {
  weekIndex = input.required<number>();
  weekExpanded = signal(false);

  expandWeek() {
    this.weekExpanded.set(!this.weekExpanded());
  }
}
