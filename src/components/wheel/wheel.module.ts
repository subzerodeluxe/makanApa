import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WheelComponent } from './wheel';

@NgModule({
  declarations: [WheelComponent],
  imports: [
    IonicPageModule.forChild(WheelComponent)
  ],
  providers: [],
  exports: [WheelComponent]
})
export class WheelComponentModule { }