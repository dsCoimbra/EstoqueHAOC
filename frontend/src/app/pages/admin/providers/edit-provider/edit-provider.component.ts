import { Component, OnInit, Input, ContentChild, AfterContentInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';

import { Provider } from '../provider.model';
import { ProvidersService } from '../providers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, NgModel, FormControlName } from '@angular/forms';
import { AlertModalService } from '../../../../shared/alert-modal.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-edit-provider',
  templateUrl: './edit-provider.component.html'
})
export class EditProviderComponent implements OnInit {

  provider: Provider;

  providerForm: FormGroup;

  option: any;

  @ContentChild(NgModel) model: NgModel;
  @ContentChild(FormControlName) control: FormControlName;

  modalRef: BsModalRef;
  @ViewChild('deleteModal') deleteModal;

  message: string;

  constructor(private location: Location,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private modal: AlertModalService,
              private providersService: ProvidersService,
              private router: Router,
              private modalService: BsModalService) { }

  ngOnInit(): any {
    console.log(this.provider);
    const idparams = 'id';
    const id = this.route.snapshot.params[idparams];
    this.providerForm = this.fb.group({
      id: [id],
      name: [null, [Validators.required, Validators.minLength(3)]],
      services: [null, Validators.required]
    });
    this.providersService.providerById(id)
      .subscribe(provider => {
        this.provider = provider;
      });
  }

  onCancel(): any {
    this.location.back();
  }

  onDelete(): any{
    this.modalRef = this.modalService.show(this.deleteModal, {class: 'modal-sm'});
  }

  onUpdate(): any{
    this.providersService.editProvider(this.providerForm.value).subscribe(
      success => {
        console.log(this.providerForm.value);
        this.modal.showAlertSuccess({ message: 'Fornecedor atualizado com sucesso', time: 1500 });
        this.router.navigate(['admin/providers']);
      },
      error => {
        if (error.status === 404){
          this.modal.showAlertDanger('Servidor indisponivel no momento, favor tentar mais tarde.', 2000);
        }
        if (error.status === 304){
          this.modal.showAlertDanger('Fornecedor já existe', 2000);
        }
    },
      () => console.log('request completo')
    );
  }

  confirm(): void {
    const idparams = 'id';
    const id = this.route.snapshot.params[idparams];
    this.providersService.deleteProvider(id).subscribe(
      success => {
        this.modal.showAlertSuccess({ message: 'Categoria excluida com sucesso', time: 1500 });
        this.router.navigate(['admin/providers']);
      },
      error => this.modal.showAlertDanger('Erro ao excluir a categoria', 2000),
      () => console.log('request completo')
    );
    this.modalRef.hide();
  }

  decline(): void {
    this.modalRef.hide();
  }
}
