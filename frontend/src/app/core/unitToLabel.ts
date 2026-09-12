import { UNITS_LABELS } from '@shared/constants/ui-mapping/units.labels';
import { ExerciseUnit } from '@core/models/training.models';

export const unitToLabel = (value: ExerciseUnit): string => {
  const unit_label = UNITS_LABELS.find((i) => i.value === value);

  if (!unit_label) return '';

  return unit_label.label.split('(')[0];
};
