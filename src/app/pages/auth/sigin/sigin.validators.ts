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

        return { 'invalidDate': true };

    };
}


export function customValidatorPassword(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const password = control.get('password')?.value;
        const repeatPassword = control.get('repeatPassword')?.value;

        // Si las contraseñas son iguales, no hay errores
        return password === repeatPassword ? null : { passwordsMismatch: true };
    };
}

