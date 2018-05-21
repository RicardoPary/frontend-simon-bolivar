import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';

@Injectable()
export class ActividadCivicaService {

  private urlResource = '/api/actividad-civicas';

  constructor(protected http: HttpClient) {
  }
  getAll(): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders(
      {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
      });
    return this.http.get('http://localhost:8080/demo/all', {headers: headers, observe: 'response'});
  }

  getActividadCivica(): Observable<HttpResponse<any>> {
    return this.http.get(`${this.urlResource}`, {observe: 'response'});
  }
}
