import { Component, OnInit, Input, ContentChild, AfterContentInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';

import { User } from '../users.model';
import { UsersService } from '../users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, NgModel, FormControlName } from '@angular/forms';
import { AlertModalService } from '../../../../shared/alert-modal.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html'
})
export class EditUsersComponent implements OnInit {

  users: User;

  userForm: FormGroup;

  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  option: any;

  @ContentChild(NgModel) model: NgModel;
  @ContentChild(FormControlName) control: FormControlName;

  modalRef: BsModalRef;
  @ViewChild('deleteModal') deleteModal;
  @ViewChild('resetPassModal') resetPassModal;

  message: string;

  constructor(private location: Location,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private modal: AlertModalService,
              private usersService: UsersService,
              private router: Router,
              private modalService: BsModalService) { }

  ngOnInit(): void {
    const idparams = 'id';
    const id = this.route.snapshot.params[idparams];
    this.userForm = this.fb.group({
      id: [id],
      name: [null, [Validators.required, Validators.minLength(3)]],
      email: [null, [Validators.required, Validators.minLength(3), Validators.pattern(this.emailPattern)]],
      typeUser: [null, Validators.required]
    });
    this.usersService.userById(id)
      .subscribe(user => {
        this.users = user;
      });
  }

  onCancel(): any {
    this.location.back();
  }

  onDelete(): any{
    this.modalRef = this.modalService.show(this.deleteModal, {class: 'modal-sm'});
  }

  onUpdate(): any{
    this.usersService.editUser(this.userForm.value).subscribe(
      success => {
        console.log(this.userForm.value);
        this.modal.showAlertSuccess({ message: 'Usuário atualizado com sucesso', time: 1500 });
        this.router.navigate(['admin/users']);
      },
      error => {
        if (error.status === 404){
          this.modal.showAlertDanger('Servidor indisponivel no momento, favor tentar mais tarde.', 2000);
        }
        if (error.status === 304){
          this.modal.showAlertDanger('Usuário já existe', 2000);
        }
    },
      () => console.log('request completo')
    );
  }

  resetPass(): any{
    this.modalRef = this.modalService.show(this.resetPassModal, {class: 'modal-sm'});
  }

  confirmReset(): void{
    const idparams = 'id';
    const id = this.route.snapshot.params[idparams];
    this.usersService.resetPassUser(id).subscribe(
      success => {
        this.modal.showAlertSuccess({message: 'Reset de senha feito com sucesso', time: 2000});
        this.router.navigate(['admin/users']);
      },
      error => {
        this.modal.showAlertDanger('Erro ao resetar senha', 2000);
      }
    );
    this.modalRef.hide();
  }

  confirm(): void {
    const idparams = 'id';
    const id = this.route.snapshot.params[idparams];
    this.usersService.deleteUser(id).subscribe(
      success => {
        this.modal.showAlertSuccess({ message: 'Usuário excluido com sucesso', time: 1500 });
        this.router.navigate(['admin/users']);
      },
      error => this.modal.showAlertDanger('Erro ao excluir o usuário', 2000),
      () => console.log('request completo')
    );
    this.modalRef.hide();
  }

  decline(): void {
    this.modalRef.hide();
  }

}
