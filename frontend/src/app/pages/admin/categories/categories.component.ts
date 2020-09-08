import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';


import { Category } from './categories.model';
import { CategoriesService } from './categories.service';
import { tap, map, debounceTime, switchMap } from 'rxjs/operators';
import { AlertModalService } from '../../../shared/alert-modal.service';
import { FormControl } from '@angular/forms';

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
  // tslint:disable-next-line: ban-types
  pag: Number = 1;
  // tslint:disable-next-line: ban-types
  contador: Number = 10;

  queryField = new FormControl();


  constructor(private categoriesService: CategoriesService,
              private alertService: AlertModalService) {}

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
