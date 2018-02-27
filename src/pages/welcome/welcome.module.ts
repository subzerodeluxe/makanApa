import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WelcomePage } from './welcome';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';

@NgModule({
  declarations: [
    WelcomePage,
  ],
  imports: [
    IonicPageModule.forChild(WelcomePage),
  ],
  providers: [
    NativePageTransitions
  ]
})
export class WelcomePageModule {}
