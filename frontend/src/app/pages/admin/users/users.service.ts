import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from './users.model';

import { environment } from '../../../../environments/environment';

@Injectable()

export class UsersService {

  private readonly API = `${environment.API}`;

  constructor(private http: HttpClient) { }

  users(search?: string): any{
    return this.http.get<User[]>(`${this.API}users/${search}`);
  }

  userById(id: string): any{
    return this.http.get<User>(`${this.API}user/${id}`);
  }

  createUser(user: any): any{
    return this.http.post(`${this.API}user`, user);
  }

  editUser(user: any): any{
    return this.http.put(`${this.API}user/${user.id}`, user);
  }

  deleteUser(id: string): any{
    return this.http.delete(`${this.API}user/${id}`);
  }

}
