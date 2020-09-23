import { LoginService } from './../login.service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Login } from './../login.model';
import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rx';
import { AlertModalService } from '../../shared/alert-modal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: Login;

  formRegister: FormGroup;

  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  constructor(private fb: FormBuilder,
              private loginService: LoginService,
              private modal: AlertModalService,
              private router: Router) { }

  ngOnInit(): void {
    this.formRegister = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      email: [null, [Validators.required, Validators.minLength(3), Validators.pattern(this.emailPattern)]],
      pass: [null, [Validators.required, Validators.minLength(8)]],
      confirmPass: [null, [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit(): void {
    if (this.formRegister.get('pass').value === this.formRegister.get('confirmPass').value){
      this.user = this.loginService.register(this.formRegister.value).subscribe(
        success => {
          this.modal.showAlertSuccess({ message: 'Usuário criado com sucesso', time: 1500 });
          this.router.navigate(['login']);
        },
        error => {
          if (error.status === 404) {
            this.modal.showAlertDanger('Servidor indisponivel no momento, favor tentar mais tarde.', 2000);
          }
          if (error.status === 304) {
            this.modal.showAlertDanger('Usuário já existe', 2000);
          }
        },
        () => console.log('request completo')
      );
    } else {
      this.modal.showAlertDanger('Senhas não coincidem', 2000);
    }
  }

}
