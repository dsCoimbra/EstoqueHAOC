import { Component, OnInit } from '@angular/core';
import { Observable, interval, Subject, empty } from 'rxjs';
import { Location } from '@angular/common';
import {Router} from '@angular/router';


import { Sector } from './sectors.model';
import { SectorsService } from './sectors.service';
import { tap, map, filter, debounceTime, switchMap } from 'rxjs/operators';
import { AlertModalService } from '../../../shared/alert-modal.service';
import { FormControl, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

declare var $: any;

@Component({
  selector: 'app-sectors',
  templateUrl: './sectors.component.html'
})
export class SectorsComponent implements OnInit {

  sectors: Sector[];

  sectors$: Observable<Sector[]>;

  error$ = new Subject<boolean>();

  // tslint:disable-next-line: ban-types
  pag: Number = 1;
  // tslint:disable-next-line: ban-types
  contador: Number = 10;
  queryField = new FormControl();

  constructor(private sectorsService: SectorsService,
              private alertService: AlertModalService) { }

  ngOnInit(): any{
    this.queryField.valueChanges
      .pipe(
        map(value => value.trim()),
        debounceTime(200),
        switchMap(value => this.sectorsService.sectors(value)),
        tap(value => console.log(value)))
      .subscribe((sectors: any) => this.sectors = sectors);

    this.sectorsService.sectors('')
      .subscribe((sectors: any) => this.sectors = sectors);
  }

  handleError(): any{
    this.alertService.showAlertDanger('Erro ao carregar os dados. Tente novamente mais tarde.', 2000);
  }

}
