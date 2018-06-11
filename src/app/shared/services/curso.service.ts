import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs/index';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {DocenteFilter} from '../models/docente';
import {createRequestOption} from '../models/extras/request-util';

@Injectable()
export class CursoService {

  private urlResource = 'api/cursos';
  private cursoFilter = new BehaviorSubject<any>(new DocenteFilter);

  constructor(protected http: HttpClient) {
  }

  sendCursoFilter(object: any) {
    this.cursoFilter.next(object);
  }

  currentCursoFilter(): Observable<any> {
    return this.cursoFilter.asObservable();
  }

  getCursoFilter() {
    return this.cursoFilter.getValue();
  }

  getAllCursos(docenteFilter: DocenteFilter): Observable<HttpResponse<any>> {
    const params = createRequestOption({
      'page': docenteFilter.page,
      'size': docenteFilter.size,
      'sort': docenteFilter.sort
    });
    return this.http.get(`${this.urlResource}`, {params: params, observe: 'response'});
  }

  createCurso(body: any): Observable<HttpResponse<any>> {
    return this.http.post(`${this.urlResource}`, body, {observe: 'response'});
  }

  deleteCurso(): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.urlResource}`, {observe: 'response'});
  }

  modifyCurso(body: any): Observable<HttpResponse<any>> {
    return this.http.put(`${this.urlResource}`, body, {observe: 'response'});
  }
}
