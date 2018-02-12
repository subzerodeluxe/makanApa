import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { MakanApp } from './app.component';

@NgModule({
  declarations: [
    MakanApp,
    ListPage
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, 
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
    ScreenOrientation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
