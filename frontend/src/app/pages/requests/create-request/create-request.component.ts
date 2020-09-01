import { Component, OnInit, ContentChild, AfterContentInit } from '@angular/core';
import { NgModel } from '@angular/forms'

@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.component.html'
})
export class CreateRequestComponent implements OnInit {

  input: any;

  @ContentChild(NgModel) model: NgModel

  constructor() { }

  ngOnInit(): void {
  }

  

}
