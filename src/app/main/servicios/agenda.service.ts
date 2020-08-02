import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Agenda} from './interfaces';
import {Observable} from 'rxjs';
import {environment} from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class AgendaService {

    urlFeriadoBusqueda = environment.url + '/agenda';

    constructor(private http: HttpClient) {
    }

    ingresarFeriado(feriadoNuevo: Agenda) {
        const url = environment.url + '/agenda';
        var resultado = this.http.post<any>(url, feriadoNuevo, httpOptions);
        return resultado;
    }

    mostrarFeriados(fechaFeriado): Observable<Agenda[]> {
        return this.http.get<Agenda[]>(this.urlFeriadoBusqueda + "?" + fechaFeriado);
    }

    updateFeriado(feriadoActualizado: Agenda, id): Observable<Agenda[]> {

        let url = environment.url + '/agenda';
        return this.http.put<any>(url + "/" + id, feriadoActualizado)
    }

    deleteFeriado(id) {
        let url = environment.url + '/agenda';
        return this.http.delete<any>(url + "/" + id)
    }

}

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

