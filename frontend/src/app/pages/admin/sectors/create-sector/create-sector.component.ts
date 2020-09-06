import { SectorsService } from '../sectors.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AlertModalService } from '../../../../shared/alert-modal.service';
import { Sector } from '../sectors.model';

@Component({
  selector: 'app-create-sector',
  templateUrl: './create-sector.component.html'
})
export class CreateSectorComponent implements OnInit {

  sectors: Sector;

  sectorForm: FormGroup;

  numberPattern = /^[0-9]*$/;

  constructor(private location: Location,
              private fb: FormBuilder,
              private sectorsService: SectorsService,
              private modal: AlertModalService,
              private router: Router) { }

  ngOnInit(): void {

    this.sectorForm = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      costCenter: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(5), Validators.pattern(this.numberPattern)]]
    });

  }

  onCancel(): void {
    this.router.navigate(['admin/sectors']);
  }

  onSubmit(): void {
    this.sectors = this.sectorsService.createSector(this.sectorForm.value).subscribe(
      success => {
        this.modal.showAlertSuccess({ message: 'Categoria criada com sucesso', time: 1500 });
        this.router.navigate(['admin/sectors']);
      },
      error => {
        if (error.status === 404) {
          this.modal.showAlertDanger('Servidor indisponivel no momento, favor tentar mais tarde.', 2000);
        }
        if (error.status === 304) {
          this.modal.showAlertDanger('Setor já existe', 2000);
        }
      },
      () => console.log('request completo')
    );
  }

}
