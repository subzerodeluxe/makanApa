import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WelcomeSplashPage } from './welcome-splash';

@NgModule({
  declarations: [
    WelcomeSplashPage,
  ],
  imports: [
    IonicPageModule.forChild(WelcomeSplashPage),
  ],
})
export class WelcomeSplashPageModule {}
