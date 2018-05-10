import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LoginRoutingModule} from './login-routing.module';
import {LoginComponent} from './login.component';
import {NgbCarouselModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    NgbCarouselModule.forRoot()
  ],
  declarations: [
    LoginComponent
  ]
})
export class LoginModule {
}
