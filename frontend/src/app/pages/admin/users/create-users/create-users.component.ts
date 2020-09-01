import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";

@Component({
  selector: 'app-create-users',
  templateUrl: './create-users.component.html'
})
export class CreateUsersComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit(): void {
  }

  cancel(){
    this.location.back();
  }

  users = [
    {name: "Administrador", id: 1},
    {name: "Comum", id: 2},
  ]

}
