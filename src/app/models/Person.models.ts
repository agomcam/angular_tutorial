export class Person {
  uid:string;
  name:string;
  surname:string;
  email:string;
  role:PersonType;
  createdAt:string;

  constructor(uid:string,name:string,surname:string,email:string,role:PersonType, createdAt:string) {
  this.uid = uid;
  this.name = name;
  this.surname = surname;
  this.email = email;
  this.role = role;
  this.createdAt = createdAt;
  }
}

export enum PersonType {
  ADMIN = "ADMIN", USER = "USER"
}
