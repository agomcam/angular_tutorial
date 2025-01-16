import {Injectable} from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut, User
} from '@angular/fire/auth';
import {catchError, from, map, Observable, of, switchMap} from 'rxjs';
import {Person} from '../models/Person.models';
import {PersonService} from './person.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth,private personService:PersonService) {
  }

  getCurrentUser() {
    return this.auth.currentUser;
  }

  register({email, password}: any) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  login({email, password}: any) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  loginWithGoogle() {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  logout() {
    return signOut(this.auth);
  }

  isAuthenticated(): Observable<User|null> {
    return new Observable((observer) => {
      onAuthStateChanged(
        this.auth,
        (user) => {
          observer.next(user);
        },
        (error) => {
          observer.error(error);
        }
      );
    });
  }

  getUserAuthenticated(): Observable<User | null> {
    return new Observable((observer) => {
      onAuthStateChanged(
        this.auth,
        (user) => {
          observer.next(user);
        },
        (error) => {
          observer.error(error);
        }
      );
    });
  }

  /***
   * Para trabajar de manera más eficiente con los observables en este ejemplo se está
   * haciendo uso de la librería RXjs que nos permitirá gestionar de manera eficiente flujos
   * de datos. Concretamente, se están usando los siguientes métodos:
   *
   *  - FROM ->  convierte algo (un array, una promesa, un conjunto de valores, etc.) en un observable.
   *  - PIPE -> es un encadenador de transformaciónes. Nos permitirá aplicar funciones de transformación
   *            a los valores emitidos por un observable. Es como si tuvieramos una cadena de operaciones.
   *            que se aplican una tras otra.
   *  - MAP -> transforma los valores que llegan de un observable. Recibe un valor, lo procesa y lo devuelve transformado.
   *
   *  - SwitchMap -> es un operador más avanzado que Map. También transforma los valores, pero la diferencia es que si se
   *                 emiten nuevos valores antes de que termine la transformación anterior, cancela la transformación
   *                 anterior y solo usa la nueva.
   */
  /**
   * Función que devuelve la información del usuario autenticado, así como los datos de su persona.
   * En caso de no existir o no estar autenticado devolverá null.
   * @returns
   */
  getUserDataAuth(): Observable<{user:User|null,person:Person|null}>{
    return from(this.getUserAuthenticated()).pipe(
      switchMap((usuario)=>{
        if(usuario && usuario.uid){
          return this.personService.getPersonByUID(usuario.uid).pipe(
            map((persona)=>{
              if(persona){
                return {user:usuario,person:persona}
              }else{
                return {user:null,person:null}
              }
            }),
            catchError(()=>{
              return of({user:null,person:null})
            })
          )
        }else{
          return of({user:null,person:null})
        }
      }),
      catchError(()=>{
        return of({user:null,person:null})
      })
    )
  }

}
