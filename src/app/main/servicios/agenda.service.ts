import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {VariablesGlobales} from './variables-globales';
import {Agenda} from './interfaces';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  urlFeriadoBusqueda = this.global.apiUrl + '/agenda';

  constructor(private http: HttpClient, private global: VariablesGlobales) {}

  ingresarFeriado(feriadoNuevo:Agenda){
    const url = this.global.apiUrl + '/agenda';
    var resultado = this.http.post<any>(url, feriadoNuevo, httpOptions);
    return resultado;
  }

  mostrarFeriados(fechaFeriado): Observable<Agenda[]> {
    return this.http.get<Agenda[]>(this.urlFeriadoBusqueda+"?"+fechaFeriado);
  }

  updateFeriado(feriadoActualizado: Agenda, id): Observable<Agenda[]> {

    let url = this.global.apiUrl+'/agenda';
    return this.http.put<any>(url+"/"+id, feriadoActualizado)
  }

  deleteFeriado(id){
    let url = this.global.apiUrl+'/agenda';
    return this.http.delete<any>(url+"/"+id)
  }

}

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

