//login.validator.ts
import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

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



export function customValidatorPriority(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valorCampo = control.value;

    // Validar si el valor es L, M o H
    const valoresValidos:string[] = ['L', 'M', 'H'];

    if (!valoresValidos.includes(valorCampo)) {
      return { 'invalidValuePriority': true }; // Error personalizado
    }

    // Si el valor es válido, no hay errores
    return null;
  };
}
