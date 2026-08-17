import { Component, output, signal, ViewEncapsulation } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-calendar-widget',
  imports: [DatePipe],
  templateUrl: './calendar-widget.html',
  styleUrl: './calendar-widget.scss',
  encapsulation: ViewEncapsulation.None,
})
export class CalendarWidgetComponent {
  currentDate = new Date();
  week: Date[] = this.getWeekDays(this.currentDate);
  selectedDay = signal<Date>(this.currentDate);

  onSelectDay = output<Date>();

  getWeekDays(baseDate: Date) {
    const start = new Date(baseDate);
    const day = start.getDay();

    const diff = day === 0 ? -6 : 1 - day;
    start.setDate(start.getDate() + diff);

    return Array.from({ length: 7 }).map((_, i) => {
      const date = new Date(start);
      date.setDate(date.getDate() + i);

      return date;
    });
  }
}
