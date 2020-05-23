import { Injectable } from '@angular/core';
import { UserModel } from '../model/user.model';
import { UUID } from 'angular2-uuid';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  create(user: UserModel): UserModel {
    if (!user.id) {
      user.id = UUID.UUID();
    }
    return user;
  }
}
