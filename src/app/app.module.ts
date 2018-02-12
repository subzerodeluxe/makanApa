import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, Injectable, Injector } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Pro } from '@ionic/pro';

import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { MakanApp } from './app.component';

const IonicPro = Pro.init('32885621', {
  appVersion: '0.0.1'
})

@Injectable()
export class MyErrorHandler implements ErrorHandler {
  ionicErrorHandler: IonicErrorHandler;

  constructor(injector: Injector) {
    try {
      this.ionicErrorHandler = injector.get(IonicErrorHandler);
    } catch(e) {
      // Unable to get the IonicErrorHandler provider, ensure
      // IonicErrorHandler has been added to the providers list below
    }
  }

  handleError(err: any): void {
    IonicPro.monitoring.handleNewError(err);
    // Remove this if you want to disable Ionic's auto exception handling
    // in development mode.
    this.ionicErrorHandler && this.ionicErrorHandler.handleError(err);
  }
}

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
    IonicErrorHandler,
        [{ provide: ErrorHandler, useClass: MyErrorHandler }]
  ]
})
export class AppModule {}
