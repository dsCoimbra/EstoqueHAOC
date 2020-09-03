import { Injectable } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from './alert-modal/alert-modal.component';

enum AlertTypes {
  DANGER = 'danger',
  SUCCESS = 'success'
}

@Injectable({
  providedIn: 'root'
})
export class AlertModalService {

  constructor(private modalService: BsModalService) { }

  private showAlert(message: string, type: string, dismissTimeOut?: number): any{
    const bsModalRef: BsModalRef = this.modalService.show(AlertModalComponent);
    bsModalRef.content.type = type;
    bsModalRef.content.message = message;

    if (dismissTimeOut) {
      setTimeout(() => bsModalRef.hide(), dismissTimeOut);
    }
  }

  showAlertDanger(message: string, time: number): any{
    this.showAlert(message, AlertTypes.DANGER, time);
  }

  showAlertSuccess({ message, time }: { message: string; time: number; }): any{
    this.showAlert(message, AlertTypes.SUCCESS, time);
  }

}
