import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {catchError, map, Observable, of} from 'rxjs';

export const authGuard: CanActivateFn = (route, state): Observable<boolean> => {

  let authService = inject(AuthService);
  let routerService = inject(Router);
  let role = route.data['role'];


  return authService.getUserDataAuth().pipe(
    map(({user, person}) => {
      if (user) {
        if (person) {
          if (person.role != null && person.role == "ADMIN" || role == "*") {
            return true;
          } else {
            routerService.navigate(['/tasks']);
            return false
          }
        } else {
          routerService.navigate(['/login']);
          return false
        }
      } else {
        routerService.navigate(['/login']);
        return false
      }
    }),
    catchError((error, caught) => {
      routerService.navigate(['/login']);
      return of(false)
    })
  )


}
