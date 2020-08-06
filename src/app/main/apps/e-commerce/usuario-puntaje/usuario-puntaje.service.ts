import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {UsuarioService} from "../../../servicios/usuario.service";

@Injectable()
export class UsuarioPuntajeService implements Resolve<any> {
    products = [];
    onProductsChanged: BehaviorSubject<any>;
    usuario: any;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     * @param listaEstudiantes
     */
    constructor(
        private _httpClient: HttpClient, private listaEstudiantes: UsuarioService
    ) {
        // Set the defaults
        this.onProductsChanged = new BehaviorSubject({});
    }

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return new Promise((resolve, reject) => {

            Promise.all([
                this.getProducts()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get products
     *
     * @returns {Promise<any>}
     */
    getProducts(): Promise<any> {
        this.products = [];
        return new Promise((resolve, reject) => {
            if (localStorage.getItem('rol' )=== 'PROFESOR'){
                this.listaEstudiantes.getUsuario(localStorage.getItem('nick')).then(data => {
                    console.log(data)
                    this.usuario = data;
                    this.products = (this.usuario.estudiante)
                    console.log(this.products)
                    this.onProductsChanged.next(this.products);
                    resolve(this.usuario.estudiante);
                }, reject);
            }
            if (localStorage.getItem('rol' )=== 'ESTUDIANTE'){
                this.listaEstudiantes.getEstudiante(localStorage.getItem('nick')).then(data => {
                    console.log(data)
                    this.usuario = data;
                    this.products = (this.usuario.estudiante)
                    console.log(this.products)
                    this.onProductsChanged.next(this.products);
                    resolve(this.usuario.estudiante);
                }, reject);
            }


        });
    }
}