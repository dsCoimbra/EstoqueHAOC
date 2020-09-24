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

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: Login;

  token: Token;

  loginForm: FormGroup;

  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  constructor(private fb: FormBuilder,
              private accountService: AccountService,
              private modal: AlertModalService,
              private router: Router,
              private loginService: LoginService,
              private http: HttpClient) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.minLength(3), Validators.pattern(this.emailPattern)]],
      pass: [null, [Validators.required, Validators.minLength(8)]]
    });
  }

  // tslint:disable-next-line: typedef
  onSubmit(): void {
    this.token = this.loginService.login(this.loginForm).subscribe(
      token => this.token = token
    );
    console.log(this.token);
  }

}
