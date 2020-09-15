import { Router } from '@angular/router';
import { ProvidersService } from './../providers.service';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AlertModalService } from '../../../../shared/alert-modal.service';
import { Provider } from '../provider.model';

@Component({
  selector: 'app-create-provider',
  templateUrl: './create-provider.component.html'
})
export class CreateProviderComponent implements OnInit {

  providers: Provider;

  providerForm: FormGroup;

  constructor(private location: Location,
              private fb: FormBuilder,
              private providersService: ProvidersService,
              private modal: AlertModalService,
              private router: Router) { }

  ngOnInit(): void {

    this.providerForm = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      services: [0, [Validators.required, Validators.min(1)]]
    });
  }

  onCancel(): void {
    this.router.navigate(['admin/providers']);
  }

  onSubmit(): void{
    console.log(this.providerForm.value);
    this.providers = this.providersService.createProvider(this.providerForm.value).subscribe(
      success => {
        this.modal.showAlertSuccess({ message: 'Fornecedor criado com sucesso', time: 1500 });
        this.router.navigate(['admin/providers']);
      },
      error => {
          if (error.status === 404){
            this.modal.showAlertDanger('Servidor indisponivel no momento, favor tentar mais tarde.', 2000);
          }
          if (error.status === 304){
            this.modal.showAlertDanger('Forncedor já existe', 2000);
          }
      },
      () => console.log('request completo')
    );
  }

}
