import { Component, OnInit, Input, HostListener, OnDestroy } from '@angular/core';
import { Observable, interval, Subject, empty } from 'rxjs';
import { Location } from '@angular/common';
import {Router} from '@angular/router';


import { Category } from './categories.model';
import { CategoriesService } from './categories.service';
import { catchError } from 'rxjs/operators';
import { AlertModalService } from '../../../shared/alert-modal.service';

declare var $: any;

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html'
})

export class CategoriesComponent implements OnInit {

  categories: Category[];

  categories$: Observable<Category[]>;
  error$ = new Subject<boolean>();

  constructor(private categoriesService: CategoriesService,
              private location: Location,
              private router: Router,
              private alertService: AlertModalService) {}

  ngOnInit(): any{
    this.categories$ = this.categoriesService.categories()
      .pipe(
        catchError(error => {
          console.error(error);
          this.handleError();
          // tslint:disable-next-line: deprecation
          return empty();
        })
      );
  }

  handleError(): any{
    this.alertService.showAlertDanger('Erro ao carregar os dados. Tente novamente mais tarde.');
  }
}
