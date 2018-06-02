import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {ServiceWorkerModule} from '@angular/service-worker';
import {AppComponent} from './app.component';

import {environment} from '../environments/environment';

import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule, HttpClient, HTTP_INTERCEPTORS} from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import {AppRoutingModule} from './app-routing.module';
import {AuthGuard} from './shared';
import {LoginService} from './shared/auth';
import {Ng2Webstorage} from 'ngx-webstorage';
import {httpFactoryProvider, RequestInterceptor} from './shared/interceptor';

// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
  // for development
  // return new TranslateHttpLoader(http, '/start-angular/SB-Admin-BS4-Angular-5/master/dist/assets/i18n/', '.json');
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


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
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    AppRoutingModule,
    NgbModule.forRoot(),
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production})
  ],
  providers: [
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
