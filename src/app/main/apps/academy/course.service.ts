import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {UsuarioService} from "../../servicios/usuario.service";

@Injectable()
export class AcademyCourseService implements Resolve<any> {
    onCourseChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     * @param cuentos
     */
    constructor(
        private _httpClient: HttpClient, private cuentos: UsuarioService
    ) {
        // Set the defaults
        this.onCourseChanged = new BehaviorSubject({});
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return new Promise((resolve, reject) => {

            Promise.all([
                this.getCourse(route.params.courseId)
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get course
     *
     * @param courseId
     * @returns {Promise<any>}
     */
    getCourse(courseId): Promise<any> {
        let cuento: any;
        let paginas = [];
        return new Promise((resolve, reject) => {
            this.cuentos.getCuentosId(courseId).then(data => {
                cuento = data;
                paginas.push(
                    {
                        cuento: cuento.cuento,
                        pagina: 'Página 1',
                        imagen: cuento.imagen1,
                        texto: cuento.texto1,
                        voz: cuento.voz1,
                    },
                    {
                        cuento: cuento.cuento,
                        pagina: 'Página 2',
                        imagen: cuento.imagen2,
                        texto: cuento.texto2,
                        voz: cuento.voz2,
                    },
                    {
                        cuento: cuento.cuento,
                        pagina: 'Página 3',
                        imagen: cuento.imagen3,
                        texto: cuento.texto3,
                        voz: cuento.voz3,
                    },
                    {
                        cuento: cuento.cuento,
                        pagina: 'Página 4',
                        imagen: cuento.imagen4,
                        texto: cuento.texto4,
                        voz: cuento.voz4,
                    },
                    {
                        cuento: cuento.cuento,
                        pagina: 'Página 5',
                        imagen: cuento.imagen5,
                        texto: cuento.texto5,
                        voz: cuento.voz5,
                    },
                    {
                        cuento: cuento.cuento,
                        pagina: 'Página 6',
                        imagen: cuento.imagen6,
                        texto: cuento.texto6,
                        voz: cuento.voz6,
                    },
                    {
                        cuento: cuento.cuento,
                        pagina: 'Página 7',
                        imagen: cuento.imagen7,
                        texto: cuento.texto7,
                        voz: cuento.voz7,
                    },
                )
                console.log(paginas)
                this.onCourseChanged.next(paginas);
                resolve(paginas);
            })
        });
    }

}
