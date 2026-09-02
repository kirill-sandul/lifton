import { Component, output, signal, ViewEncapsulation } from '@angular/core';
import { DatePipe } from '@angular/common';
import { isSameDay, setDate } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { ButtonComponent } from '@shared/components/button/button';
import { LucideDynamicIcon } from '@lucide/angular';

@Component({
  selector: 'app-calendar-widget',
  imports: [DatePipe, ButtonComponent, LucideDynamicIcon],
  templateUrl: './calendar-widget.html',
  styleUrl: './calendar-widget.scss',
  encapsulation: ViewEncapsulation.None,
})
export class CalendarWidgetComponent {
  currentDate = new Date();
  week: Date[] = this.getWeekDays(this.currentDate);
  selectedDay = signal<Date>(this.currentDate);

  onSelectDay = output<Date>();
  onOpenFull = output();

  protected readonly isSameDay = isSameDay;

  ngOnInit() {
    this.onSelectDay.emit(this.currentDate);
  }

  getWeekDays(baseDate: Date) {
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const start = new Date(baseDate);
    const startInTz = toZonedTime(start, userTimeZone);

    return Array.from({ length: 7 }).map((_, i) => {
      return setDate(startInTz, i);
    });
  }
}
