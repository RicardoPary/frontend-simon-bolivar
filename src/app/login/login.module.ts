import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LoginRoutingModule} from './login-routing.module';
import {LoginComponent} from './login.component';
import {NgbCarouselModule} from '@ng-bootstrap/ng-bootstrap';
import {ActividadCivicaService} from '../shared/services/actividad-civica.service';
import {ReunionService} from '../shared/services/reunion.service';
import {FormModule} from '../pages/form/form.module';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {AccountService, AuthStorage, LoginService} from '../shared/auth';
import {AuthServerProvider} from '../shared/auth/auth-jwt.service';
import {Principal} from '../shared/auth/principal.service';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormModule,
    FormsModule,
    NgbCarouselModule.forRoot()
  ],
  declarations: [
    LoginComponent
  ],
  providers: [
    ActividadCivicaService,
    ReunionService,
    LoginService,
    AuthServerProvider,
    Principal,
    AccountService,
    AuthServerProvider,
    AuthStorage
  ]
})
export class LoginModule {
}
