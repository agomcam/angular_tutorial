import {Component} from '@angular/core';


import {CommonModule} from '@angular/common';

import {NavBarComponent} from '../../components/nav-bar/nav-bar.component';
import {TasklistComponent} from '../../components/task/tasklist/tasklist.component';
import {TaskformComponent} from '../../components/task/taskform/taskform.component';
import {FooterComponent} from '../../components/footer/footer.component';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    CommonModule,
    NavBarComponent,
    TasklistComponent,
    TaskformComponent,
    FooterComponent
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {

}
