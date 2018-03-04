import { NgModule } from '@angular/core';
import { WheelComponent } from './wheel/wheel';
import { IonicModule } from 'ionic-angular';
@NgModule({
	declarations: [WheelComponent],
	imports: [IonicModule],
	exports: [WheelComponent]
})
export class ComponentsModule {}
