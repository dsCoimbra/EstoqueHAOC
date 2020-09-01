import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Location } from '@angular/common';

import { Category } from '../categories.model';
import { CategoriesService } from '../categories.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertModalService } from '../../../../shared/alert-modal.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html'
})
export class EditCategoryComponent implements OnInit {

  category: Category;

  categoryForm: FormGroup;

  modalRef: BsModalRef;
  @ViewChild('deleteModal') deleteModal;

  message: string;

  constructor(private location: Location,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private modal: AlertModalService,
              private categoriesService: CategoriesService,
              private router: Router,
              private modalService: BsModalService) { }

  ngOnInit(): any {
    console.log(this.category);
    const idparams = 'id';
    const id = this.route.snapshot.params[idparams];
    this.categoriesService.categoryById(id)
      .subscribe(categories => this.category = categories);

    this.categoryForm = this.fb.group({
      id: [id],
      name: [null, [Validators.required, Validators.minLength(3)]]
    });

  }

  onCancel(): any {
    this.location.back();
  }

  onDelete(): any{
    this.modalRef = this.modalService.show(this.deleteModal, {class: 'modal-sm'});
  }

  onUpdate(): any{
    this.categoriesService.editCategory(this.categoryForm.value).subscribe(
      success => {
        console.log(this.categoryForm.value);
        this.modal.showAlertSuccess('Categoria atualizada com sucesso', 1500);
        this.router.navigate(['admin/categories']);
      },
      error => this.modal.showAlertDanger('Erro ao editar a categoria'),
      () => console.log('request completo')
    );
  }

  confirm(): void {
    const idparams = 'id';
    const id = this.route.snapshot.params[idparams];
    this.categoriesService.deleteCategory(id).subscribe(
      success => {
        this.modal.showAlertSuccess('Categoria excluida com sucesso', 1500);
        this.router.navigate(['admin/categories']);
      },
      error => this.modal.showAlertDanger('Erro ao excluir a categoria'),
      () => console.log('request completo')
    );
    this.modalRef.hide();
  }

  decline(): void {
    this.modalRef.hide();
  }
}
