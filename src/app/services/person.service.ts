import {Injectable} from '@angular/core';
import {Database, DataSnapshot, get, objectVal, ref, set} from '@angular/fire/database';
import {Person, PersonType} from '../models/Person.models';
import {User} from '@angular/fire/auth';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private COLLECTION_NAME: string = `Persons`;

  constructor(private database: Database) {
  }

  getPersonByUID(uid: string): Observable<Person> {
    let personRef = ref(this.database, `${this.COLLECTION_NAME}/${uid}`);
    return objectVal(personRef) as Observable<Person>;
  }

  savePerson(person: Person): Promise<void> {

    let personRef = ref(this.database, `/${this.COLLECTION_NAME}/${person.uid}`);
    return set(personRef, person) as Promise<void>;
  }
  getPersonByGoogle(user: User) {
    // Si no tienes un apellido, puedes dejarlo vacío o derivarlo de alguna otra forma
    const surname = `${user.displayName?.split(' ')[0]} ${user.displayName?.split(' ')[1]} ` || ''; // Asume que el apellido es la segunda palabra en displayName
    const name = user.displayName?.split(' ')[2]
    return new Person(
      user.uid,
      name || 'Sin nombre',  // Si no tienes un displayName, usar un valor predeterminado
      surname,
      user.email || 'sin-email@domain.com', // Si no tienes email, usar un valor predeterminado
      PersonType.USER, // Asumimos que el rol es "USER" por defecto, puedes modificar esto según tu lógica
      user.metadata.creationTime || new Date().toISOString() // Usa la fecha de creación de la cuenta, o la actual si no se encuentra
    );
  }
}
