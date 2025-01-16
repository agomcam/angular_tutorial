import {Routes} from '@angular/router';
import {StatsComponent} from './components/dashboard/stats/stats.component';
import {ProfileComponent} from './components/dashboard/profile/profile.component';
import {LoginComponent} from './pages/auth/login/login.component';
import {SiginComponent} from './pages/auth/sigin/sigin.component';
import {TasksComponent} from './pages/tasks/tasks.component';
import {HomeComponent} from './pages/home/home.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {NotfoundComponent} from './pages/notfound/notfound.component';
import {canActivate, redirectUnauthorizedTo} from '@angular/fire/auth-guard';
import {authGuard} from './guards/auth.guard';

export const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'singin', component: SiginComponent},
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard], data: {role: "ADMIN"}
  },
  {
    path: 'tasks',
    component: TasksComponent,
    canActivate: [authGuard], data: {role: "*"}
  },
  {path: 'formTaskEdit/:id', component: HomeComponent},
  {
    path: 'dashboard', component: DashboardComponent, children: [
      {path: 'stats', component: StatsComponent},
      {path: 'profile', component: ProfileComponent}
    ],
    canActivate: [authGuard], data: {role: "*"}
  },
  {path: 'notfound', component: NotfoundComponent},
  {path: '', redirectTo: '/tasks', pathMatch: 'full'},
  {path: '**', redirectTo: '/notfound', pathMatch: 'full'},
];
