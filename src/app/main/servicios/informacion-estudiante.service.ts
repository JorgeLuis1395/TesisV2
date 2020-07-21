import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable()
export class InformacionEstudianteService {
  apiUrl = environment.url;

  constructor(public http: HttpClient,) {
  }

  getEstudianteConsulta() {

    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/estudiante/' + environment.nick,
        {headers: new HttpHeaders({'Authorization': 'Bearer ' + environment.tokenUsuario})}).subscribe(data => {
        resolve(data);

      }, err => {
      });
    });
  }

  uploadFile(file: any): Observable<any> {

    const urlServicios = this.apiUrl + '/estudiante/upload-image';
    let formData: FormData = new FormData();
    formData.append('image', file);
    return this.http.post<any>(urlServicios, formData, {headers: new HttpHeaders({'Authorization': 'Bearer ' + environment.tokenUsuario})})
  }

  putEstudiante(
    nombre, apellido, email, nick, password, cedula, codigo_estudiante, fecha_nacimiento, grado, telefono, unidad_educativa, nombreFoto, rol) {
    const param = {
      nombre,
      apellido,
      email,
      nick,
      password,
      cedula,
      codigo_estudiante,
      fecha_nacimiento,
      grado,
      telefono,
      unidad_educativa,
      nombreFoto,
      rol
    };

    return new Promise((resolve, reject) => {
      this.http.put(this.apiUrl + '/estudiante/'+ environment.nick, param, {headers: new HttpHeaders({'Authorization': 'Bearer ' + environment.tokenUsuario})})
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  saveEstudiante(
    nombre, apellido, email, nick, password, cedula, codigo_estudiante, fecha_nacimiento, grado, telefono, unidad_educativa, nombreFoto, rol) {
    const param = {
      nombre,
      apellido,
      email,
      nick,
      password,
      cedula,
      codigo_estudiante,
      fecha_nacimiento,
      grado,
      telefono,
      unidad_educativa,
      nombreFoto,
      rol
    };

    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + '/estudiante', param, {headers: new HttpHeaders({'Authorization': 'Bearer ' + environment.tokenUsuario})})
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  saveProfesorEstudiante(
    usuarioId, estudianteId,) {
    const param = {
      usuarioId,
      estudianteId,

    };

    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + '/profesorEstudiante', param, {headers: new HttpHeaders({'Authorization': 'Bearer ' + environment.tokenUsuario})})
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

}
