import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function usernameValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;

    const regexp = /^[a-zA-Z][a-zA-Z0-9_-]*$/;
    const valid = regexp.test(control.value);

    return valid ? null : { usernamePattern: true };
  };
}
