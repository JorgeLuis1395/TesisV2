import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {UsuarioService} from "../../../servicios/usuario.service";
import {environment} from "../../../../../environments/environment";
import Swal from "sweetalert2";
import {InformacionEstudianteService} from "../../../servicios/informacion-estudiante.service";

@Injectable()
export class CalificacionesnewService implements Resolve<any> {
    routeParams: any;
    product: any;
    onProductChanged: BehaviorSubject<any>;
    private usuario: any;
    private idEstudiante: number;
    private aux: any;
    private idCalificacion: number;
    private estudiantes: any;
    private auxCalificaciones: any;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     * @param listaEstudiantes
     * @param _informacion
     */
    constructor(
        private _httpClient: HttpClient,
        private listaEstudiantes: UsuarioService,
        private _informacion: InformacionEstudianteService
    ) {
        // Set the defaults
        this.onProductChanged = new BehaviorSubject({});
    }

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        this.routeParams = route.params;

        return new Promise((resolve, reject) => {

            Promise.all([
                this.getProduct()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get product
     *
     * @returns {Promise<any>}
     */
    getProduct(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.routeParams.id === 'new') {
                this.onProductChanged.next(false);
                resolve(false);
            } else {
                console.log(this.routeParams.handle)
                let aux: any;
                this.listaEstudiantes.getEstudiante(this.routeParams.handle).then(data => {
                    this.usuario = data;
                    this.product = this.usuario;
                    this.onProductChanged.next(this.product);
                    resolve(aux);
                }, reject);
            }
        });
    }

    /**
     * Save product
     *
     * @param product
     * @returns {Promise<any>}
     */
    saveProduct(product, imagen): Promise<any> {
        let aux: any;
        product.nombreFoto = imagen
        return new Promise((resolve, reject) => {
            this._httpClient.put(environment.url + '/estudiante/' + this.routeParams.id, product, {headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('tokenUsuario')})}).subscribe(data => {
                console.log('ok')
            }, reject);

        });
    }

    /**
     * Add product
     *
     * @param product
     * @returns {Promise<any>}
     */
    addProduct(product): Promise<any> {
        return new Promise((resolve, reject) => {
            this.saveCalificacion(product)
        });
    }

    saveCalificacion(product) {

        this._httpClient.post(environment.url + '/calificaciones', {
            tipo: product.tipo,
            detalle: product.detalle,
            materia: product.materia,
            calificacion: product.calificacion
        }, {headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('tokenUsuario')})}).subscribe(data=>{
            this.aux = Object.values(data)[1][0];
            this.idCalificacion = parseInt(Object.values(this.aux)[0].toString());
            this.estudianteCalificacion();
            this.getEstudiante()
        })
/*
        this.usuario.postCalificaciones({
            tipo: product.tipo,
            detalle: product.detalle,
            materia: product.materia,
            calificacion: product.calificacion
        }).then((result) => {
            this.aux = Object.values(result)[1][0];
            this.idCalificacion = parseInt(Object.values(this.aux)[0].toString());
            this.estudianteCalificacion();
            this.getEstudiante()
        }, (err) => {
            console.log(err);
        });*/
    }

    getEstudiante() {
        this.listaEstudiantes.getEstudianteId(this.routeParams.id).then(data => {
            this.estudiantes = data;
            console.log(this.estudiantes)
            this.auxCalificaciones = Object.values(data)[14]
        });
    }

    estudianteCalificacion() {

        this.listaEstudiantes.saveCalificacionEstudiante(parseInt(this.routeParams.id),
            this.idCalificacion,
        ).then((result) => {
            result

            this.registrocorrecto();
        }, (err) => {
            this.registroIncorrecto();
        });
    }


    registrocorrecto() {
        Swal.fire({
            title: 'Correcto!',
            text: 'Se ingresó de manera correcta el usuario',
            icon: 'success',
            confirmButtonText: 'Aceptar'
        })
    }

    registroIncorrecto() {
        Swal.fire({
            title: 'Error!',
            text: 'No se ingresó el usuario, carga una imagen o verifica tus contraseñas',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        })
    }


}
