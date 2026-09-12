import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const targetValueValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const initialValue = control.get('initialValue');
  const targetValue = control.get('targetValue');

  if (initialValue && targetValue) {
    if (parseInt(targetValue.value) <= parseInt(initialValue.value))
      return {
        targetValueError: true,
      };
  }

  return null;
};
