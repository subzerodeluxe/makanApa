import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MakanApp } from './app.component';

@NgModule({
  declarations: [
    MakanApp,
    ListPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MakanApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MakanApp,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
