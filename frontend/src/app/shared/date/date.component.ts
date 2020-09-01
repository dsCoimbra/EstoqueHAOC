import {Component} from '@angular/core';

@Component({
  selector: 'example-app',
  template: `
    
      <select name="state">
        <option value="" disabled>Choose a state</option>
        <option *ngFor="let state of states" [ngValue]="state">
          {{ state.abbrev }}
        </option>
      </select>
  `,
})
export class DateComponent {
  states = [
    {name: 'Arizona', abbrev: 'AZ'},
    {name: 'California', abbrev: 'CA'},
    {name: 'Colorado', abbrev: 'CO'},
    {name: 'New York', abbrev: 'NY'},
    {name: 'Pennsylvania', abbrev: 'PA'},
  ];
}


