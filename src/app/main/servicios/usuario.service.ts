import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {UserInterface} from "../../interface/user.interface";
import {CuentaInterface} from "../../interface/cuenta.interface";
import {Router} from "@angular/router";
import {LoginService} from "./login.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

    constructor(public http: HttpClient) {
    }

    apiUrl = environment.url;
    private idpuntajeFonologico: number;

    getUsuario(nick) {
        return new Promise(resolve => {
            this.http.get(this.apiUrl + '/usuario/' + nick,
                {headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('tokenUsuario')})}).subscribe(data => {
                resolve(data);
                environment.idProfesor = Object.values(data)[0];

            }, err => {
                console.log(err);
            });
        });
    }


    getCuentosId(idCuento) {
        return new Promise(resolve => {
            this.http.get(this.apiUrl + '/cuentos/'+ idCuento,
                {headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('tokenUsuario')})}).subscribe(data => {
                resolve(data);

            }, err => {
                console.log(err);
            });
        });
    }

    getCuentos() {
        return new Promise(resolve => {
            this.http.get(this.apiUrl + '/cuentos',
                {headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('tokenUsuario')})}).subscribe(data => {
                resolve(data);
            }, err => {
                console.log(err);
            });
        });
    }



    getEstudiante(nickUsuario) {
        return new Promise(resolve => {
            this.http.get(this.apiUrl + '/estudiante/' + nickUsuario,
                {headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('tokenUsuario')})}).subscribe(data => {
                resolve(data);
            }, err => {
                console.log(err);
            });
        });
    }



    saveCalificacionEstudiante(
        estudianteId, calificacionId,) {
        const param = {
            estudianteId,
            calificacionId

        };

        return new Promise((resolve, reject) => {
            this.http.post(this.apiUrl + '/estudianteCalificacion', param, {headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('tokenUsuario')})})
                .subscribe(res => {
                    resolve(res);
                }, (err) => {
                    reject(err);
                });
        });
    }

    getEstudianteId(idEstudiante) {

        return new Promise(resolve => {
            this.http.get(this.apiUrl + '/estudiante/id/' + idEstudiante,
                {headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('tokenUsuario')})}).subscribe(data => {
                resolve(data);

            }, err => {
                console.log(err);
            });
        });
    }

    getPuntajeFonoloficaId() {

        this.idpuntajeFonologico = environment.idPuntaje - 1;
        return new Promise(resolve => {
            this.http.get(this.apiUrl + '/puntaje/' + this.idpuntajeFonologico,
                {headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('tokenUsuario')})}).subscribe(data => {
                resolve(data);
                console.log(data);
            }, err => {
                console.log(err);
            });
        });
    }

    getPuntajeVisualId() {

        return new Promise(resolve => {
            this.http.get(this.apiUrl + '/puntaje/' + environment.idPuntaje,
                {headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('tokenUsuario')})}).subscribe(data => {
                resolve(data);

            }, err => {
                console.log(err);
            });
        });
    }

    savePuntajeEstudiante(
        estudianteId, puntajeId,) {
        const param = {
            estudianteId,
            puntajeId

        };

        return new Promise((resolve, reject) => {
            this.http.post(this.apiUrl + '/estudiantePuntaje', param, {headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('tokenUsuario')})})
                .subscribe(res => {
                    resolve(res);
                }, (err) => {
                    reject(err);
                });
        });
    }
    postCalificaciones(calificacion) {

        return new Promise((resolve, reject) => {
            this.http.post(this.apiUrl + '/calificaciones',  calificacion, {headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('tokenUsuario')})})
                .subscribe(res => {
                    resolve(res);
                }, (err) => {
                    reject(err);
                });
        });
    }

    postPuntaje(puntaje, detalle) {
        const param = {
            puntaje,
            detalle,
        };

        return new Promise((resolve, reject) => {
            this.http.post(this.apiUrl + '/puntaje', param, {headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('tokenUsuario')})})
                .subscribe(res => {
                    resolve(res);
                }, (err) => {
                    reject(err);
                });
        });
    }

    postAgenda(fecha, fecha_fin, nombre, hora_inicio, hora_fin, ubicacion, etiqueta, descripcion) {
        const param = {
            fecha,
            fecha_fin,
            nombre, hora_inicio, hora_fin, ubicacion, etiqueta, descripcion
        };

        return new Promise((resolve, reject) => {
            this.http.post(this.apiUrl + '/agenda', param, {headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('tokenUsuario')})})
                .subscribe(res => {
                    resolve(res);
                }, (err) => {
                    reject(err);
                });
        });
    }

    saveAgendaProfesor(
        usuarioId, agendaId,) {
        const param = {
            usuarioId,
            agendaId

        };

        return new Promise((resolve, reject) => {
            this.http.post(this.apiUrl + '/agendaProfesor', param, {headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('tokenUsuario')})})
                .subscribe(res => {
                    resolve(res);
                }, (err) => {
                    reject(err);
                });
        });
    }

    uploadFile(file: any): Observable<any> {

        const urlServicios = this.apiUrl + '/usuario/upload-image';
        let formData: FormData = new FormData();
        formData.append('image', file);
        return this.http.post<any>(urlServicios, formData, {headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('tokenUsuario')})})
    }


}
