import {Routes} from '@angular/router';
import {HomeComponent} from './components/pages/home/home.component';
import {TasksComponent} from './components/pages/tasks/tasks.component';
import {DashboardComponent} from './components/pages/dashboard/dashboard.component';
import {NotfoundComponent} from './components/pages/notfound/notfound.component';
import {TaskformComponent} from './components/task/taskform/taskform.component';
import {StatsComponent} from './components/dashboard/stats/stats.component';
import {ProfileComponent} from './components/dashboard/profile/profile.component';

export const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'tasks', component: TasksComponent},
  {
    path: 'dashboard', component: DashboardComponent, children: [
      {path: 'stats', component: StatsComponent},
      {path: 'profile', component: ProfileComponent}
    ]
  },
  {path: 'notfound', component: NotfoundComponent},
  {path: 'taskEdit/:id', component: TaskformComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', redirectTo: '/notfound', pathMatch: 'full'},
];
