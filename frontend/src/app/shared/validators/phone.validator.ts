import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function phoneValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if(!control.value) return null;

    const phone = control.value.replace(/\s/g, '');
    const valid = /^\+?[1-9]\d{7,14}$/.test(phone);

    return valid ? null : { phone: true }
  }
}