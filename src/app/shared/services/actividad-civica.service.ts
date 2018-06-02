import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {DocenteFilter} from '../models/docente';
import {createRequestOption} from '../models/extras/request-util';

@Injectable()
export class ActividadCivicaService {

  private urlResource = 'api/actividad-civicas';
  private docenteFilter = new BehaviorSubject<any>(new DocenteFilter);

  constructor(protected http: HttpClient) {
  }

  sendDocenteFilter(object: any) {
    this.docenteFilter.next(object);
  }

  currentDocenteFilter(): Observable<any> {
    return this.docenteFilter.asObservable();
  }

  getDocenteFilter() {
    return this.docenteFilter.getValue();
  }

  getAllDocentes(docenteFilter: DocenteFilter): Observable<HttpResponse<any>> {
    const params = createRequestOption({
      'page': docenteFilter.page,
      'size': docenteFilter.size,
      'sort': docenteFilter.sort
    });
    return this.http.get(`${this.urlResource}`, {params: params, observe: 'response'});
  }

  postAct5ividadCivica(body: any): Observable<HttpResponse<any>> {
    return this.http.post(`${this.urlResource}`, body, {observe: 'response'});
  }

  deleteActividadCivica(): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.urlResource}`, {observe: 'response'});
  }

  putActividadCivica(body: any): Observable<HttpResponse<any>> {
    return this.http.put(`${this.urlResource}`, body, {observe: 'response'});
  }
}
