import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  formLogin: FormGroup;
  isInvalid: boolean = false;

  constructor(formBuilder: FormBuilder, private serviveAuth: AuthService, private router: Router) {
    this.formLogin = formBuilder.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required, Validators.minLength(6)]]
    })

  }

  OnSubmit() {
    if (this.formLogin.valid) {
      console.log("El login es valido")
      this.serviveAuth.login(this.formLogin.value)
        .then((response) => {

          this.router.navigate(['/']).catch((error) => {
            console.log(error);
          });

        })
        .catch(() => this.isInvalid = true);
    } else {
      console.log("El login es invalido")
    }
  }

  loginGoogle() {
    this.serviveAuth.loginWithGoogle()
      .then((response) => {
        console.log("No esta bien configurao")
        this.router.navigate(['/']).catch((error) => {
          console.log(error);
        });

      })
      .catch(error => console.log(error))
  }
}
