import { AuthGuard } from './../../shared/auth.guard';
import { HttpClient } from '@angular/common/http';
import { AlertModalService } from './../../shared/alert-modal.service';
import { AlertModalComponent } from './../../shared/alert-modal/alert-modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './../login.service';
import { Login, Token } from './../login.model';
import { Router } from '@angular/router';
import { AccountService } from './../../shared/account.service';
import { Component, OnInit } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { Observable } from 'rx';
import { debounceTime, map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: Login;

  token: Token;

  tokens: {};

  token$: Observable<Token>;

  loginForm: FormGroup;

  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  constructor(private fb: FormBuilder,
              private accountService: AccountService,
              private modal: AlertModalService,
              private router: Router,
              private loginService: LoginService,
              private http: HttpClient,
              private auth: AuthGuard) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.minLength(3), Validators.pattern(this.emailPattern)]],
      pass: [null, [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit(): void {
    this.token = this.loginService.login(this.loginForm.value)
                    .then(
                      res => window.localStorage.setItem('token', res)
                    )
                    .catch(
                      erro => {
                        if (erro.status === 305){
                          this.modal.showAlertDanger('Senha incorreta', 2000);
                          this.router.navigate(['/login']);
                        }
                        if (erro.status === 304){
                          this.modal.showAlertDanger('Usuário não existe', 2000);
                          this.router.navigate(['/login']);
                        }
                    });

  }

}
