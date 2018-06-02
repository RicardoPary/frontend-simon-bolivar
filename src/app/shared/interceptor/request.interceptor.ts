import { Injectable, Injector } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../environments/environment';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { LoginService } from '../services/login.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  private localStorage: LocalStorageService;
  private sessionStorage: SessionStorageService;

  constructor(private injector: Injector) {
    this.localStorage = injector.get(LocalStorageService);
    this.sessionStorage = injector.get(SessionStorageService);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const fullUrl = environment.endPoint + req.url;
    const token = this.localStorage.retrieve('authenticationToken') || this.sessionStorage.retrieve('authenticationToken');

    if (token) {
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
        url: fullUrl
      });
    } else {
      req = req.clone({
        url: fullUrl
      });
    }

    return next.handle(req)
      .map((event: HttpEvent<any>) => {
        return event;
      })
      .catch((err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            console.warn(`Unauthorized Error: ${err.status}, Logout and redirect to Login`);
            const loginService: LoginService = this.injector.get(LoginService);
            loginService.logout();
            const router: Router = this.injector.get(Router);
            router.navigate(['login']).then(() => {});
          }
          return Observable.throw(err);
        }
      });
  }
}
