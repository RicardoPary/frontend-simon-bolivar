import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {createRequestOption} from '../models/extras/request-util';
import {DocenteFilter} from '../models/docente';

@Injectable()
export class BimestreService {

  private urlResource = 'api/bimestres';
  private docenteFilter = new BehaviorSubject<any>(new DocenteFilter);

  constructor(protected http: HttpClient) {
  }

  createBimestre(body: any): Observable<HttpResponse<any>> {
    return this.http.post(`${this.urlResource}`, body, {observe: 'response'});
  }

  deleteBimestre(): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.urlResource}`, {observe: 'response'});
  }

  modifyBimestre(body: any): Observable<HttpResponse<any>> {
    return this.http.put(`${this.urlResource}`, body, {observe: 'response'});
  }
}
