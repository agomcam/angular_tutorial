import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavBarComponent} from '../../components/nav-bar/nav-bar.component';
import {TaskformComponent} from '../../components/task/taskform/taskform.component';
import {FooterComponent} from '../../components/footer/footer.component';
import {PersonService} from '../../services/person.service';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {PersonType} from '../../models/Person.models';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, NavBarComponent, NavBarComponent, TaskformComponent, FooterComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService, private personService: PersonService, private router: Router) {
  }

  ngOnInit() {
    this.authService.getUserAuthenticated().subscribe(user => {
      if (user) {
        this.personService.getPersonByUID(user.uid).subscribe(person => {
          if (person) {
            if (person.role == PersonType.USER) this.router.navigate(['/']);
          }
        })
      }
    })

  }
}
