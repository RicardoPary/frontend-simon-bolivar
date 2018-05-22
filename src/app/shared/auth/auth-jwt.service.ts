import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AuthStorage } from './auth-storage';
import {environment} from '../../../environments/environment';

@Injectable()
export class AuthServerProvider {

  constructor(private http: HttpClient, private store: AuthStorage) { }

  login(credentials): Observable<any> {
    const data = {
      username: credentials.username,
      password: credentials.password,
      rememberMe: credentials.rememberMe
    };
    return this.http.post(environment.endPoint + 'api/authenticate', data).map(authenticateSuccess.bind(this));

    function authenticateSuccess(resp) {
      const jwt = resp.id_token;
      this.storeAuthenticationToken(jwt, credentials.rememberMe);
      return jwt;
    }
  }

  storeAuthenticationToken(jwt, rememberMe) {
    this.store.storeAuth(jwt, rememberMe);
  }

  logout(): Observable<any> {
    return new Observable(observer => {
      this.store.clearStorage();
      observer.complete();
    });
  }
}
