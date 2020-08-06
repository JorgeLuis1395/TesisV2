import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {UsuarioService} from "../../../servicios/usuario.service";
import {environment} from "../../../../../environments/environment";

@Injectable()
export class TestDiagnosticoService implements Resolve<any> {
    products = [];
    onProductsChanged: BehaviorSubject<any>;
    usuario: any;
    routeParams: any;
    dislexiaFonologica: [];
    dislexiaVisual: [];

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
        this.routeParams = route.params;
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
            this.listaEstudiantes.getEstudianteId(this.routeParams.id).then(data => {
                this.usuario = data;
                console.log(this.products)
                if (this.usuario.puntaje) {
                    this.products = (this.usuario.puntaje)
                    console.log(this.products)
                    this.onProductsChanged.next(this.products);
                    resolve(this.usuario.calificacion);
                } else {
                    this.products = []
                    console.log(this.products)
                    this.onProductsChanged.next(this.products);
                }
                this.onProductsChanged.next(this.products);
                resolve(this.usuario.estudiante);
            }, reject);


        });
    }


}
