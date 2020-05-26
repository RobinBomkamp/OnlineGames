import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private currentUserSelector: string = "online-games-current-user";

  constructor() { }

  saveUser(userName: string) {
    localStorage.setItem(this.currentUserSelector, userName);
  }

  getUser(): string {
    let result = localStorage.getItem(this.currentUserSelector);
    return result !== null && result !== undefined && result !== "" ? result : "";
  }
}
