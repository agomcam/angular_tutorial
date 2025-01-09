import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {CommonModule} from '@angular/common';
import {PersonService} from '../../services/person.service';
import {Person, PersonType} from '../../models/Person.models';
import {User} from '@angular/fire/auth';


@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    RouterLink, CommonModule
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit {


  isAuthenticated: boolean = false;
  rolePerson: PersonType | null = null;

  constructor(private router: Router, private authService: AuthService, private personService: PersonService) {
  }

  ngOnInit(): void {

    this.authService.getUserAuthenticated().subscribe((user: User | null) => {
      if (user) {
       this.isAuthenticated = true;
       this.personService.getPersonByUID(user.uid).subscribe((person: Person) => {
         if (person) {
           this.rolePerson = person.role;
           console.log(this.rolePerson);
         }
       })
      }
    })

  }

  logout() {
    this.authService.logout()
      .then(response => {
        console.log(response)
        this.router.navigate(['/login']).catch((e) => console.log(e));
      })
      .catch(error => console.log(error));
  }

  protected readonly PersonType = PersonType;
}
