import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'

@Component({
  selector: 'app-create-sector',
  templateUrl: './create-sector.component.html'
})
export class CreateSectorComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit(): void {
  }

   cancel(){
     this.location.back();
   }

}
