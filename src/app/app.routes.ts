import {Routes} from '@angular/router';
import {StatsComponent} from './components/dashboard/stats/stats.component';
import {ProfileComponent} from './components/dashboard/profile/profile.component';
import {LoginComponent} from './pages/auth/login/login.component';
import {SiginComponent} from './pages/auth/sigin/sigin.component';
import {TasksComponent} from './pages/tasks/tasks.component';
import {HomeComponent} from './pages/home/home.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {NotfoundComponent} from './pages/notfound/notfound.component';

export const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'singin', component: SiginComponent},
  {path: 'home', component: HomeComponent},
  {path:'tasks', component: TasksComponent},
  {
    path: 'dashboard', component: DashboardComponent, children: [
      {path: 'stats', component: StatsComponent},
      {path: 'profile', component: ProfileComponent}
    ]
  },
  {path: 'notfound', component: NotfoundComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', redirectTo: '/notfound', pathMatch: 'full'},
];
