import { BsModalService } from 'ngx-bootstrap/modal';
import { Component, OnInit } from '@angular/core';
import { Observable, interval, Subject, empty } from 'rxjs';
import { Location } from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';


import { User } from './users.model';
import { UsersService } from './users.service';
import { tap, map, filter, debounceTime, switchMap } from 'rxjs/operators';
import { AlertModalService } from '../../../shared/alert-modal.service';
import { FormControl, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

declare var $: any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {

  users: User[];

  users$: Observable<User[]>;

  error$ = new Subject<boolean>();

  // tslint:disable-next-line: ban-types
  pag: Number = 1;
  // tslint:disable-next-line: ban-types
  contador: Number = 10;
  queryField = new FormControl();

  constructor(private usersService: UsersService,
              private alertService: AlertModalService,
              private route: ActivatedRoute,
              private router: Router,
              private modal: AlertModalService) { }

  ngOnInit(): void {
    this.queryField.valueChanges
      .pipe(
        map(value => value.trim()),
        debounceTime(200),
        switchMap(value => this.usersService.users(value)),
        tap(value => console.log(value)))
      .subscribe((users: any) => this.users = users);

    this.usersService.users('')
        .subscribe((users: any) => this.users = users);
  }

  handleError(): any{
    this.alertService.showAlertDanger('Erro ao carregar os dados. Tente novamente mais tarde.', 2000);
  }

  aproved(id: string): any{
    this.usersService.aprovedUser(id).subscribe(
      success => {
        this.modal.showAlertSuccess({ message: 'Usuário aprovado', time: 1500});
        this.router.navigate(['admin/users']);
        this.usersService.users('')
          .pipe(
            debounceTime(200),
          )
          .subscribe((users: any) => this.users = users);
      },
      error => {
        this.modal.showAlertDanger('Servidor indisponivel no momento, favor tentar mais tarde.', 2000);
      }
    )
  }

  notAproved(id: string): any{
    this.usersService.deleteUser(id).subscribe(
      success => {
        this.modal.showAlertSuccess({message: 'Usuário não aprovado e excluido da relação', time: 2000});
        this.router.navigate(['admin/users']);
        this.usersService.users('').subscribe((users: any) => this.users = users);
      },
      error => {
        this.modal.showAlertDanger('Servidor indisponivel no momento, favor tentar mais tarde.', 2000);
      }
    )
  }

}
