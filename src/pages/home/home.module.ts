import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';

@NgModule({
  declarations: [
    HomePage
  ],
  imports: [
    IonicPageModule.forChild(HomePage)
  ],
  providers: [
    NativePageTransitions
  ]
})
export class HomePageModule {}
