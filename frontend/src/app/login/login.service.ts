import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Login } from './login.model';

import { environment } from '../../environments/environment';
import { htmlAstToRender3Ast } from '@angular/compiler/src/render3/r3_template_transform';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly API = `${environment.API}`;

  constructor(private http: HttpClient) { }

  login(user: any): any{
    return this.http.post(`${this.API}login`, user);
  }

  register(user: any): any{
    return this.http.post(`${this.API}register`, user);
  }

}
