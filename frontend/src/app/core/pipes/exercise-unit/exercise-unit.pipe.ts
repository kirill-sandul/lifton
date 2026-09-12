import { Pipe, PipeTransform } from '@angular/core';
import { ExerciseUnit } from '@core/models/training.models';
import { unitToLabel } from '@core/unitToLabel';

@Pipe({
  name: 'exerciseUnit',
})
export class ExerciseUnitPipe implements PipeTransform {
  transform(value: ExerciseUnit) {
    return unitToLabel(value);
  }
}
