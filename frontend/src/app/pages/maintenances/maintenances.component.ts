import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'

declare var $: any;

@Component({
  selector: 'app-maintenances',
  templateUrl: './maintenances.component.html'
})
export class MaintenancesComponent implements OnInit {

  constructor(private location: Location) {  }

  
  cancel() {
    this.location.back();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    $(function () {
      $('#maintenances').DataTable({
        'responsive'  : true,
        'columnDefs'  : [
          { 'responsivePriority': 1, 'targets': 0 }
        ],
        'paging'      : true,
        'lengthChange': true,
        'searching'   : true,
        'ordering'    : true,
        'info'        : true,
        'autoWidth'   : true,
        'language'    : {
          "paginate" : {
            "first" : "Primeiro",
            "last" : "Ultimo",
            "next" : ">>",
            "previous" : "<<"              
          },
          "info": "Mostrando página _PAGE_ até _PAGES_",
          "search" : "Pesquisar",
          "lengthMenu": 'Mostrar <select>'+
                 '<option value="10">10</option>'+
                 '<option value="15">15</option>'+
                 '<option value="20">20</option>'+
                 '<option value="35">35</option>'+
                 '<option value="-1">Todos</option>'+
                 '</select> Itens'
        }
      })
    })
  }
}
