import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Location } from '@angular/common';
import {Router} from '@angular/router';


import { Provider } from './provider.model';
import { ProvidersService } from './providers.service';
import { tap, map, debounceTime, switchMap } from 'rxjs/operators';
import { AlertModalService } from '../../../shared/alert-modal.service';
import { FormControl } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html'
})
export class ProvidersComponent implements OnInit {

  providers: Provider[];

  provider$: Observable<Provider[]>;
  error$ = new Subject<boolean>();
  // tslint:disable-next-line: ban-types
  pag: Number = 1;
  // tslint:disable-next-line: ban-types
  contador: Number = 10;

  queryField = new FormControl();


  constructor(private providersService: ProvidersService,
              private alertService: AlertModalService) {}

  ngOnInit(): any{
    this.queryField.valueChanges
      .pipe(
        map(value => value.trim()),
        debounceTime(200),
        switchMap(value => this.providersService.provider(value)),
        tap(value => console.log(value)))
      .subscribe((providers: any) => this.providers = providers);

    this.providersService.provider('')
      .subscribe((providers: any) => this.providers = providers);
  }

  handleError(): any{
    this.alertService.showAlertDanger('Erro ao carregar os dados. Tente novamente mais tarde.', 2000);
  }
}


