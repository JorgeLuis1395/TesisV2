import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable, Subject} from 'rxjs';
import {environment} from "../../../../environments/environment";

@Injectable()
export class CalendarService implements Resolve<any> {
    events: any;
    onEventsUpdated: Subject<any>;
    arregloEventos = []

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient
    ) {
        // Set the defaults
        this.onEventsUpdated = new Subject();
        this.ejemploUsuario();
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
                this.getEvents()
            ]).then(
                ([events]: [any]) => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get events
     *
     * @returns {Promise<any>}
     */
   async getEvents(): Promise<any> {
        let calendario = []
        return new Promise((resolve, reject) => {

            this._httpClient.get(environment.url + '/agenda')
                .subscribe((response: any) => {
                    let unicos: any;
                    unicos = response;
                    //this.events = response;
                    for (let j = 0; j < this.arregloEventos.length; j++) {
                        for (let i = 0; i < unicos.length; i++) {
                            if (this.arregloEventos[j].toString() === unicos[i].id.toString()) {
                                calendario.push({
                                    start: new Date(unicos[i].fechaInicio),
                                    end: new Date(unicos[i].fechaFin),
                                    title: unicos[i].titulo,
                                    allDay: false,
                                    color: {
                                        primary: unicos[i].color,
                                    },
                                    draggable: true,
                                    meta: {
                                        location: unicos[i].ubicacion,
                                        notes: unicos[i].descripcion,
                                    },
                                    resizable: {beforeStart: true, afterEnd: true},
                                    actions: [{
                                        label: '<i class="material-icons s-16"></i>',
                                        onClick: 'ƒ'
                                    },
                                        {
                                            label: '<i class="material-icons s-16"></i>',
                                            onClick: 'ƒ'
                                        }]
                                });
                            }
                        }
                    }
                    this.events = calendario;
                    this.onEventsUpdated.next(this.events);
                    resolve(this.events);
                }, reject);
        });
    }

    ejemploUsuario() {
        this._httpClient.get(environment.url + '/agendaProfesor').subscribe(ejem => {
            let aux: any;
            aux = ejem
            for (let i = 0; i < aux.length; i++) {
                if (aux[i].usuarioId.toString() === localStorage.getItem('idProfesorRegistrado').toString()) {
                    this.arregloEventos.push(aux[i].agendaId)
                }
            }
        })
    }

    /**
     * Update events
     *
     * @param events
     * @returns {Promise<any>}
     */
    updateEvents(events): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.post('api/calendar/events', {
                id: 'events',
                data: [...events]
            })
                .subscribe((response: any) => {
                    this.getEvents();
                }, reject);
        });
    }

}
