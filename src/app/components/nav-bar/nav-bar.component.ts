import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {CommonModule} from '@angular/common';


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

  constructor(private router: Router, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated
  }

  singout() {
    this.authService.logout()
      .then(response => {
      console.log(response)
      this.router.navigate(['/login'])
    })
      .catch(error => console.log(error));
  }
}
