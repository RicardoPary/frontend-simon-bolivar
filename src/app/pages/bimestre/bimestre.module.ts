import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BimestreRoutingModule} from './bimestre-routing.module';
import {BimestreComponent} from './bimestre.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BimestreRoutingModule
  ],
  declarations: [BimestreComponent]
})
export class BimestreModule {
}
