import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavBarComponent} from '../../components/nav-bar/nav-bar.component';
import {TaskformComponent} from '../../components/task/taskform/taskform.component';
import {FooterComponent} from '../../components/footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, NavBarComponent, NavBarComponent, TaskformComponent, FooterComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
