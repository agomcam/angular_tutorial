import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  formLogin: FormGroup;
  constructor(formBuilder: FormBuilder) {
    this.formLogin = formBuilder.group({
      'email': ['', [Validators.required,Validators.email]],
      'password':['',[Validators.required]]
    })
  }

  OnSubmit(){
    if (this.formLogin.valid) {
      console.log("El login es valido")
    }else{
      console.log("El login es invalido")
    }
  }
}
