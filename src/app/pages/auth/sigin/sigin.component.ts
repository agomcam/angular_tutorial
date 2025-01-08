import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {customValidatorPassword} from './sigin.validators';
import {CommonModule} from '@angular/common';
import {AuthService} from '../../../services/auth.service';
import {Router, RouterLink} from '@angular/router';
import {NavBarComponent} from '../../../components/nav-bar/nav-bar.component';
import {FooterComponent} from '../../../components/footer/footer.component';
import {Person, PersonType} from '../../../models/Person.models';
import {PersonService} from '../../../services/person.service';

@Component({
  selector: 'app-sigin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavBarComponent, FooterComponent, RouterLink],
  templateUrl: './sigin.component.html',
  styleUrl: './sigin.component.css'
})
export class SiginComponent {
  formSingIn: FormGroup
  isErrorEmail: boolean = false;

  constructor(formBuilder: FormBuilder, private serviceAuth: AuthService, private router: Router, private personService: PersonService) {
    this.formSingIn = formBuilder.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required, Validators.minLength(6)]],
      'repeatPassword': ['', [Validators.required]],
      'name': ['', [Validators.required]],
      'surname': ['', [Validators.required]],
      'isAdmin': ['', []],
    }, {validators: customValidatorPassword()})
  }

  onSubmit() {
    if (this.formSingIn.valid) {


      this.serviceAuth.register(this.formSingIn.value)
        .then(response => {
          let person: Person = new Person(
            response.user.uid,
            this.formSingIn.get('name')?.value,
            this.formSingIn.get('surname')?.value,
            this.formSingIn.get('email')?.value,
            this.formSingIn.get('isAdmin')?.value ? PersonType.ADMIN : PersonType.USER,
            new Date().toString() // Establezco la fecha
          );

          this.personService.savePerson(person).catch((e) => console.log(e));

          this.router.navigate(['/login']).catch((e) => console.log(e));

        })
        .catch(() => this.isErrorEmail = true);


    }

  }
}
