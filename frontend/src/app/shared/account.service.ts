import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor() { }

  login(user: any): any {
    return new Promise((resolve) => {
      window.localStorage.setItem('token', 'meu-token');
      resolve(true);
    });
  }

  create(account: any): any{
    return new Promise((resolve) => {
      resolve(true);
    });
  }
}
