import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html'
})
export class CreateInvoiceComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit(): void {
  }

  cancel(){
    this.location.back();
  }

}
