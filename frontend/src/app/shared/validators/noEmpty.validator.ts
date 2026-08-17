import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function noEmptyValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isEmpty = (control.value || '').trim().length === 0;

    return isEmpty ? { empty: true } : null;
  };
}
