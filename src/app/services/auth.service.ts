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
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth) {
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
          observer.complete();
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
          observer.complete();
        },
        (error) => {
          observer.error(error);
        }
      );
    });
  }
}
