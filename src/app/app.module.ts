import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AppComponent} from './app.component';
import {environment} from '../environments/environment';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule, HttpClient, HTTP_INTERCEPTORS} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AuthGuard} from './shared';
import {LoginService} from './shared/auth';
import {Ng2Webstorage} from 'ngx-webstorage';
import {httpFactoryProvider, RequestInterceptor} from './shared/interceptor';
import { ServiceWorkerModule } from '@angular/service-worker';
import {AlertService} from './shared/components/alert/alert.service';
// AoT requires an exported function for factories



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    Ng2Webstorage.forRoot({prefix: 'kke-pro', separator: '-'}),
    AppRoutingModule,
    NgbModule.forRoot(),
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    AlertService,
    AuthGuard,
    httpFactoryProvider(),
    [{
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true,
    }],
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
