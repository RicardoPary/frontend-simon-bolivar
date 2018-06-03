import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BimestreRoutingModule} from './bimestre-routing.module';
import {BimestreComponent} from './bimestre.component';
import {FormsModule} from '@angular/forms';
import {BimestreService} from '../../shared/services/bimestre.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BimestreRoutingModule
  ],
  declarations: [
    BimestreComponent
  ],
  providers: [
    BimestreService
  ]
})
export class BimestreModule {
}
