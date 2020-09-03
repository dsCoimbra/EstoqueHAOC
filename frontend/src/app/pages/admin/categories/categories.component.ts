import { Component, OnInit, Input, HostListener, OnDestroy } from '@angular/core';
import { Observable, interval, Subject, empty } from 'rxjs';
import { Location } from '@angular/common';
import {Router} from '@angular/router';


import { Category } from './categories.model';
import { CategoriesService } from './categories.service';
import { catchError, tap, map, filter, distinct, distinctUntilChanged, debounceTime, switchMap } from 'rxjs/operators';
import { AlertModalService } from '../../../shared/alert-modal.service';
import { FormControl, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

declare var $: any;

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html'
})

export class CategoriesComponent implements OnInit {

  categories: Category[];

  categories$: Observable<Category[]>;
  categories1$: Observable<Category[]>;
  error$ = new Subject<boolean>();

  queryField = new FormControl();

  private readonly API = `${environment.API}`;


  constructor(private categoriesService: CategoriesService,
              private location: Location,
              private router: Router,
              private alertService: AlertModalService,
              private fb: FormBuilder,
              private http: HttpClient) {}

  ngOnInit(): any{
    this.queryField.valueChanges
      .pipe(
        map(value => value.trim()),
        debounceTime(200),
        switchMap(value => this.categoriesService.categories(value)),
        tap(value => console.log(value)))
      .subscribe((categories: any) => this.categories = categories);

    this.categoriesService.categories('')
      .subscribe((categories: any) => this.categories = categories);
  }

  handleError(): any{
    this.alertService.showAlertDanger('Erro ao carregar os dados. Tente novamente mais tarde.', 2000);
  }
}
