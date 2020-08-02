import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {UsuarioService} from "../../../servicios/usuario.service";
import {environment} from "../../../../../environments/environment";
import Swal from "sweetalert2";
import {InformacionEstudianteService} from "../../../servicios/informacion-estudiante.service";

@Injectable()
export class EcommerceProductService implements Resolve<any> {
    routeParams: any;
    product: any;
    onProductChanged: BehaviorSubject<any>;
    private usuario: any;
    private idEstudiante: number;

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
    addProduct(product, imagen, codigo): Promise<any> {
        product.nombreFoto = imagen
        return new Promise((resolve, reject) => {
        this.saveEstudiante(product, imagen, codigo)
        });
    }
    saveEstudiante(data, imagen, codigo) {
        let aux: any;
        this._informacion.saveEstudiante({
            nombre: data.nombre,
            apellido: data.apellido,
            email: data.email,
            nick: data.nick,
            password: data.password,
            cedula: data.cedula,
            codigo_estudiante: codigo,
            fecha_nacimiento: data.fecha_nacimiento,
            grado: data.grado,
            telefono: data.telefono,
            unidad_educativa: data.unidad_educativa,
            nombreFoto: imagen,
            rol: 'Est'}).then((result) => {
            result

            aux = Object.values(result)[1][0];
            this.idEstudiante = parseInt(Object.values(aux)[0].toString());
            this.profesorEstudiante();
            this.registrocorrecto();
        }, (err) => {
            this.registroIncorrecto()
        });
    }

    profesorEstudiante() {
        this._informacion.saveProfesorEstudiante(parseInt(localStorage.getItem('idProfesorRegistrado')),
            parseInt(this.idEstudiante.toString()),
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
