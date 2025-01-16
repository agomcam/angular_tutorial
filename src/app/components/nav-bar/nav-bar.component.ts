import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {CommonModule} from '@angular/common';
import {PersonService} from '../../services/person.service';
import {PersonType} from '../../models/Person.models';


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
    this.authService.getUserDataAuth().subscribe(({user, person}) => {
      if (user) {
        this.isAuthenticated = true;

        if (person && person.role) {
          this.rolePerson = person.role;
          this.isAuthenticated = true;
        }
      }else{
        this.isAuthenticated = false;
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
