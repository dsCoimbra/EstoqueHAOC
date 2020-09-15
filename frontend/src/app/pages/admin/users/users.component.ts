import { Component, OnInit } from '@angular/core';
import { Observable, interval, Subject, empty } from 'rxjs';
import { Location } from '@angular/common';
import {Router} from '@angular/router';


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
              private alertService: AlertModalService) { }

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

  }

  notAproved(id: string): any{

  }

}
