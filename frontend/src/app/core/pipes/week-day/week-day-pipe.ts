import { Pipe, PipeTransform } from '@angular/core';
import { WeekDay } from '@core/models/training.models';

export type WeekDayPipeFormat = 'short' | 'full';

@Pipe({
  name: 'weekDay',
})
export class WeekDayPipe implements PipeTransform {
  private capitalize(value: string): string {
    return String(value).slice(0, 1) + String(value).slice(1).toLowerCase();
  }

  transform(value: WeekDay, format: WeekDayPipeFormat): unknown {
    if (format === 'short') {
      const capitalized = this.capitalize(value);

      return capitalized.slice(0, 3);
    } else if (format === 'full') {
      return this.capitalize(value);
    } else return value;
  }
}
