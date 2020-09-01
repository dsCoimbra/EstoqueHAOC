import { Router } from '@angular/router';
import { CategoriesService } from './../categories.service';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { CategoriesComponent } from '../categories.component';
import { AlertModalService } from '../../../../shared/alert-modal.service';
import { Category } from '../categories.model';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html'
})
export class CreateCategoryComponent implements OnInit {

  categories: Category;

  categoryForm: FormGroup;

  constructor(private location: Location,
              private fb: FormBuilder,
              private categoryService: CategoriesService,
              private modal: AlertModalService,
              private router: Router) { }

  ngOnInit(): void {

    this.categoryForm = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(3)]]
    });

  }

  onCancel(): void {
    this.router.navigate(['admin/categories']);
  }

  onSubmit(): void{
    this.categoryService.createCategory(this.categoryForm.value).subscribe(
      success => {
        this.modal.showAlertSuccess('Categoria criada com sucesso', 1500);
        this.router.navigate(['admin/categories']);
      },
      error => this.modal.showAlertDanger('Erro ao criar a categoria'),
      () => console.log('request completo')
    );
  }


}
