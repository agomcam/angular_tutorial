import {Component, OnInit} from '@angular/core';
import {PersonService} from '../../../services/person.service';
import {Person} from '../../../models/Person.models';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  person: Person | null = null;

  constructor(private personService: PersonService, private authService: AuthService) {
  }

  ngOnInit(): void {

    this.authService.getUserAuthenticated().subscribe((user) => {
      if (user) {
        this.personService.getPersonByUID(user.uid).subscribe((person) => {
          if (person) {
            this.person = person;
          } else {
            this.person = this.personService.getPersonByGoogle(user)
          }

        })
      }
    })
  }

}
