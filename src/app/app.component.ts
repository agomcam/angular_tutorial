import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SiginComponent } from './components/auth/sigin/sigin.component';
import { TasklistComponent } from "./components/task/tasklist/tasklist.component";
import {FormsModule} from '@angular/forms'
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule, NavBarComponent, FooterComponent, LoginComponent, SiginComponent, RouterLink, TasklistComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-tutorial-app';
  imagen: string = "";
  url: string = "";

  imgAleatoria() {
    this.imagen = "https://picsum.photos/200/300?random=" + Math.round(Math.random() * 1000)
  }

}
