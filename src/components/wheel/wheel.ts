import { Component } from '@angular/core';

@Component({
  selector: 'wheel',
  templateUrl: 'wheel.html'
})
export class WheelComponent {

  text: string;

  constructor() {
    console.log('Hello WheelComponent Component');
    this.text = 'Hello World';
  }

}
