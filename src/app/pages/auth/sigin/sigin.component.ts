import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { customValidatorPassword } from './sigin.validators';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { error } from 'console';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sigin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sigin.component.html',
  styleUrl: './sigin.component.css'
})
export class SiginComponent {
  formSingIn: FormGroup

  constructor(formBuilder: FormBuilder, private serviceAuth: AuthService, private router: Router) {
    this.formSingIn = formBuilder.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required, Validators.minLength(6)]],
      'repeatPassword': ['', [Validators.required]],
    }, { validators: customValidatorPassword() })
  }

  onSubmit() {
    if (this.formSingIn.valid) {
      console.log("Formulario Valido")
      this.serviceAuth.register(this.formSingIn.value)
        .then(response => {
          console.log(response);
          this.router.navigate(['/login'])

        })
        .catch(error => console.log(error))

    }
  }
}
