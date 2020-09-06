import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Location } from '@angular/common';

import { Sector } from '../sectors.model';
import { SectorsService } from '../sectors.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertModalService } from '../../../../shared/alert-modal.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-edit-sector',
  templateUrl: './edit-sector.component.html'
})
export class EditSectorComponent implements OnInit {

  sector: Sector;

  sectorForm: FormGroup;

  numberPattern = /^[0-9]*$/;

  modalRef: BsModalRef;
  @ViewChild('deleteModal') deleteModal;

  message: string;

  constructor(private location: Location,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private modal: AlertModalService,
              private sectorsService: SectorsService,
              private router: Router,
              private modalService: BsModalService) { }

  ngOnInit(): any {
    console.log(this.sector);
    const idparams = 'id';
    const id = this.route.snapshot.params[idparams];
    this.sectorsService.sectorById(id)
      .subscribe(sectors => this.sector = sectors);

    this.sectorForm = this.fb.group({
      id: [id],
      name: [null, [Validators.required, Validators.minLength(3)]],
      costCenter: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(5), Validators.pattern(this.numberPattern)]]
    });

  }

  onCancel(): any {
    this.location.back();
  }

  onDelete(): any {
    this.modalRef = this.modalService.show(this.deleteModal, { class: 'modal-sm' });
  }

  onUpdate(): any {
    this.sectorsService.editSector(this.sectorForm.value).subscribe(
      success => {
        console.log(this.sectorForm.value);
        this.modal.showAlertSuccess({ message: 'Categoria atualizada com sucesso', time: 1500 });
        this.router.navigate(['admin/sectors']);
      },
      error => {
        if (error.status === 404) {
          this.modal.showAlertDanger('Servidor indisponivel no momento, favor tentar mais tarde.', 2000);
        }
        if (error.status === 304) {
          this.modal.showAlertDanger('Categoria já existe', 2000);
        }
      },
      () => console.log('request completo')
    );
  }

  confirm(): void {
    const idparams = 'id';
    const id = this.route.snapshot.params[idparams];
    this.sectorsService.deleteSector(id).subscribe(
      success => {
        this.modal.showAlertSuccess({ message: 'Categoria excluida com sucesso', time: 1500 });
        this.router.navigate(['admin/sectors']);
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
