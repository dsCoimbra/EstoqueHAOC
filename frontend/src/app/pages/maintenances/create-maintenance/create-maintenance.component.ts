import { Component, OnInit, ContentChild, AfterContentInit } from '@angular/core';
import { NgModel, FormBuilder } from '@angular/forms'
import { Location } from '@angular/common'

import {FormControl, FormGroup, Validators, AbstractControl} from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-create-maintenance',
  templateUrl: './create-maintenance.component.html'
})
export class CreateMaintenanceComponent implements OnInit {

  numberPattern = /^[0-9]*$/

  maintenance: FormGroup

  input: any;
  empresas = [
    {name: "WA", id: 1},
    {name: "Santana", id: 2},
  ]

  @ContentChild(NgModel) model: NgModel

  today: number = Date.now();

  constructor(private location: Location) {  }

  ngOnInit(): void {
    
  }
  
  cancel() {
    this.location.back();
  }

  ngAfterViewInit(){
  }

}
