import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BimestreRoutingModule} from './bimestre-routing.module';
import {BimestreComponent} from './bimestre.component';

@NgModule({
  imports: [
    CommonModule,
    BimestreRoutingModule
  ],
  declarations: [BimestreComponent]
})
export class BimestreModule {
}
