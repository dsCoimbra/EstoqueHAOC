import { UsersService } from '../users.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AlertModalService } from '../../../../shared/alert-modal.service';
import { User } from '../users.model';
@Component({
  selector: 'app-create-users',
  templateUrl: './create-users.component.html'
})
export class CreateUsersComponent implements OnInit {

  users: User;

  userForm: FormGroup;

  constructor(private location: Location,
              private fb: FormBuilder,
              private usersService: UsersService,
              private modal: AlertModalService,
              private router: Router) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      email: [null, [Validators.required, Validators.minLength(3)]],
      typeUser: [0, [Validators.required]]
    });
  }

  onCancel(): void{
    this.router.navigate(['admin/users']);
  }

  onSubmit(): void {
    this.users = this.usersService.createUser(this.userForm.value).subscribe(
      success => {
        this.modal.showAlertSuccess({ message: 'Usuário criada com sucesso', time: 1500 });
        this.router.navigate(['admin/users']);
      },
      error => {
        if (error.status === 404) {
          this.modal.showAlertDanger('Servidor indisponivel no momento, favor tentar mais tarde.', 2000);
        }
        if (error.status === 304) {
          this.modal.showAlertDanger('Setor já existe', 2000);
        }
      },
      () => console.log('request completo')
    );
  }

}
