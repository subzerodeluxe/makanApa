import { Component, Input } from '@angular/core';

@Component({
  selector: 'wheel',
  templateUrl: 'wheel.html',
})

export class WheelComponent {

  @Input() track
  
  constructor() {
    console.log('Hello WheelComponent Component');
   
  }

}
