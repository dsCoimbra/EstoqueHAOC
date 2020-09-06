import { Router } from '@angular/router';
import { CategoriesService } from './../categories.service';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
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
    this.categories = this.categoryService.createCategory(this.categoryForm.value).subscribe(
      success => {
        this.modal.showAlertSuccess({ message: 'Categoria criada com sucesso', time: 1500 });
        this.router.navigate(['admin/categories']);
      },
      error => {
          if (error.status === 404){
            this.modal.showAlertDanger('Servidor indisponivel no momento, favor tentar mais tarde.', 2000)
          }
          if (error.status === 304){
            this.modal.showAlertDanger('Categoria já existe', 2000);
          }
      },
      () => console.log('request completo')
    );
  }


}
