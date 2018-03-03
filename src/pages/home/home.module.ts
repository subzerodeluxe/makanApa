import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';

import { WheelComponent } from '../../components/wheel/wheel';

@NgModule({
  declarations: [
    HomePage,
    WheelComponent
  ],
  imports: [
    IonicPageModule.forChild(HomePage)
  ],
  providers: []
})
export class HomePageModule {}
