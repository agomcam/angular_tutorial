//login.validator.ts
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

//Ejemplo estructura función
export function customValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let valorCampo = control.value

    let today = new Date();
    let expirationDate: Date = new Date(valorCampo);

    if (expirationDate >= today) {
      return null;
    }

    return {'invalidDate': true};

  };
}
