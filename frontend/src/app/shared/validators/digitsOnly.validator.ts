import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function digitsOnlyValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if(!control.value) return null;

    return /^\d+$/.test(control.value) ? null : { digitsOnly: true }
  }
}