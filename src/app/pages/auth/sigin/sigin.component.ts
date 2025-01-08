import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {customValidatorPassword} from './sigin.validators';
import {CommonModule} from '@angular/common';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {NavBarComponent} from '../../../components/nav-bar/nav-bar.component';
import {FooterComponent} from '../../../components/footer/footer.component';
import {Person, PersonType} from '../../../models/Person.models';
import {PersonService} from '../../../services/person.service';

@Component({
  selector: 'app-sigin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavBarComponent, FooterComponent],
  templateUrl: './sigin.component.html',
  styleUrl: './sigin.component.css'
})
export class SiginComponent {
  formSingIn: FormGroup

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
          let person: Person = this.formSingIn.value;
          person.createdAt = new Date().toISOString(); // Establezco la fecha
          person.uid = response.user.uid;
          person.role = this.formSingIn.get('isAdmin')?.value ? PersonType.ADMIN : PersonType.USER

          this.personService.savePerson(person).then(() => {
            console.log(`Persona registrada`)
          }).catch((e) => console.log(e));

          this.router.navigate(['/login'])

        })
        .catch(error => console.log(error))


    }

  }
}
