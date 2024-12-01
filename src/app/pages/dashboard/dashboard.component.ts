import {Component} from '@angular/core';

import {CommonModule} from '@angular/common';
import {RouterLink, RouterOutlet} from '@angular/router';
import {NavBarComponent} from '../../components/nav-bar/nav-bar.component';
import {TaskformComponent} from '../../components/task/taskform/taskform.component';
import {TasklistComponent} from '../../components/task/tasklist/tasklist.component';
import {FooterComponent} from '../../components/footer/footer.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule, NavBarComponent, RouterOutlet, RouterLink, TaskformComponent, TasklistComponent, FooterComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
