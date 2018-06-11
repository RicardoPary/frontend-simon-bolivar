import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/index';
import {HttpClient, HttpResponse} from '@angular/common/http';

@Injectable()
export class MateriaService {

  private urlResource = 'api/materias';

  constructor(protected http: HttpClient) {
  }

  getAllMaterias(): Observable<HttpResponse<any>> {
    return this.http.get(`${this.urlResource}`, {observe: 'response'});
  }

  createMateria(body: any): Observable<HttpResponse<any>> {
    return this.http.post(`${this.urlResource}`, body, {observe: 'response'});
  }

  deleteMateria(): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.urlResource}`, {observe: 'response'});
  }

  modifyMateria(body: any): Observable<HttpResponse<any>> {
    return this.http.put(`${this.urlResource}`, body, {observe: 'response'});
  }

  getAllMateriasByIdcursoAndIdDocente(idCurso: any, idDocente: any): Observable<HttpResponse<any>> {
    return this.http.get(`${this.urlResource}/${idCurso}/curso/${idDocente}/docente`, {observe: 'response'});
  }
}
