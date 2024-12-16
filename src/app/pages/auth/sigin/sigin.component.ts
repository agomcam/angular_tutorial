import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { customValidatorPassword } from './sigin.validators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sigin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sigin.component.html',
  styleUrl: './sigin.component.css'
})
export class SiginComponent {
  formSingIn: FormGroup

  constructor(formBuilder: FormBuilder) {
    this.formSingIn = formBuilder.group({
      'name': ['', [Validators.required]],
      'suername': ['', [Validators.required]],
      'email': ['', [Validators.required, Validators.email]],
      'user': ['', [Validators.required]],
      'password': ['', [Validators.required]],
      'repeatPassword': ['', [Validators.required]],
    }, { validators: customValidatorPassword() })
  }

  onSubmit(){
    if(this.formSingIn.valid) console.log("Formulario Valido")
  }
}
