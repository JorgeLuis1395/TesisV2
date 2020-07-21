import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import {UsuarioService} from "../../servicios/usuario.service";

@Injectable()
export class AcademyCoursesService implements Resolve<any>
{
    onCategoriesChanged: BehaviorSubject<any>;
    onCoursesChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     * @param cuentos
     */
    constructor(
        private _httpClient: HttpClient, private cuentos: UsuarioService
    )
    {
        // Set the defaults
        this.onCategoriesChanged = new BehaviorSubject({});
        this.onCoursesChanged = new BehaviorSubject({});
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
        return new Promise((resolve, reject) => {

            Promise.all([
                this.getCuentos()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }



    aux: any;
    ngOnInit() {
        this.getCuentos();
    }


    getCuentos(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this.cuentos.getCuentos().then(data => {
                this.onCoursesChanged.next(data);
                resolve(data);
                }, reject);
        });
    }

}
