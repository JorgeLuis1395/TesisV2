import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Subject} from 'rxjs';
import {startOfDay, isSameDay, isSameMonth} from 'date-fns';
import {
    CalendarEvent,
    CalendarEventAction,
    CalendarEventTimesChangedEvent,
    CalendarMonthViewDay
} from 'angular-calendar';

import {FuseConfirmDialogComponent} from '@fuse/components/confirm-dialog/confirm-dialog.component';
import {fuseAnimations} from '@fuse/animations';

import {CalendarService} from 'app/main/apps/calendar/calendar.service';
import {CalendarEventModel} from 'app/main/apps/calendar/event.model';
import {CalendarEventFormDialogComponent} from 'app/main/apps/calendar/event-form/event-form.component';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
    selector: 'calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CalendarComponent implements OnInit {
    actions: CalendarEventAction[];
    activeDayIsOpen: boolean;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    dialogRef: any;
    events: CalendarEvent[];
    refresh: Subject<any> = new Subject();
    selectedDay: any;
    view: string;
    viewDate: Date;
    locale: string = 'es';

    constructor(
        private _matDialog: MatDialog,
        private _calendarService: CalendarService,
        private httpClient: HttpClient,
    ) {
        // Set the defaults
        this.view = 'month';
        this.viewDate = new Date();
        this.activeDayIsOpen = true;
        this.selectedDay = {date: startOfDay(new Date())};

        this.actions = [
            {
                label: '<i class="material-icons s-16">edit</i>',
                onClick: ({event}: { event: CalendarEvent }): void => {
                    this.editEvent('edit', event);
                }
            },
            {
                label: '<i class="material-icons s-16">delete</i>',
                onClick: ({event}: { event: CalendarEvent }): void => {
                    this.deleteEvent(event);
                }
            }
        ];

        /**
         * Get events from service/server
         */
        this.setEvents();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        /**
         * Watch re-render-refresh for updating db
         */
        this.refresh.subscribe(updateDB => {
            if (updateDB) {
                this._calendarService.updateEvents(this.events);
            }
        });

        this._calendarService.onEventsUpdated.subscribe(events => {
            this.setEvents();
            this.refresh.next();
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Set events
     */
    setEvents(): void {
        this.events = this._calendarService.events.map(item => {
            item.actions = this.actions;
            console.log(item)
            return new CalendarEventModel(item);
        });
    }

    /**
     * Before View Renderer
     *
     * @param {any} header
     * @param {any} body
     */
    beforeMonthViewRender({header, body}): void {
        /**
         * Get the selected day
         */
        const _selectedDay = body.find((_day) => {
            return _day.date.getTime() === this.selectedDay.date.getTime();
        });

        if (_selectedDay) {
            /**
             * Set selected day style
             * @type {string}
             */
            _selectedDay.cssClass = 'cal-selected';
        }

    }

    /**
     * Day clicked
     *
     * @param {MonthViewDay} day
     */
    dayClicked(day: CalendarMonthViewDay): void {
        const date: Date = day.date;
        const events: CalendarEvent[] = day.events;

        if (isSameMonth(date, this.viewDate)) {
            if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0) {
                this.activeDayIsOpen = false;
            } else {
                this.activeDayIsOpen = true;
                this.viewDate = date;
            }
        }
        this.selectedDay = day;
        this.refresh.next();
    }

    /**
     * Event times changed
     * Event dropped or resized
     *
     * @param {CalendarEvent} event
     * @param {Date} newStart
     * @param {Date} newEnd
     */
    eventTimesChanged({event, newStart, newEnd}: CalendarEventTimesChangedEvent): void {
        event.start = newStart;
        event.end = newEnd;
        this.refresh.next(true);
    }

    /**
     * Delete Event
     *
     * @param event
     */
    deleteEvent(event): void {
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Deseas Eliminar el evento?';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                const eventIndex = this.events.indexOf(event);
                this.events.splice(eventIndex, 1);
                this.refresh.next(true);
            }
            this.confirmDialogRef = null;
        });

    }

    /**
     * Edit Event
     *
     * @param {string} action
     * @param {CalendarEvent} event
     */
    editEvent(action: string, event: CalendarEvent): void {
        const eventIndex = this.events.indexOf(event);

        this.dialogRef = this._matDialog.open(CalendarEventFormDialogComponent, {
            panelClass: 'event-form-dialog',
            data: {
                event: event,
                action: action
            }
        });

        this.dialogRef.afterClosed()
            .subscribe(response => {
                if (!response) {
                    return;
                }
                const actionType: string = response[0];
                const formData: FormGroup = response[1];
                switch (actionType) {
                    /**
                     * Save
                     */
                    case 'save':

                        this.events[eventIndex] = Object.assign(this.events[eventIndex], formData.getRawValue());
                        this.refresh.next(true);


                        break;
                    /**
                     * Delete
                     */
                    case 'delete':

                        this.deleteEvent(event);

                        break;
                }
            });
    }

    /**
     * Add Event
     */
    addEvent(): void {
        this.dialogRef = this._matDialog.open(CalendarEventFormDialogComponent, {
            panelClass: 'event-form-dialog',
            data: {
                action: 'new',
                date: this.selectedDay.date
            }
        });
        this.dialogRef.afterClosed()
            .subscribe((response: FormGroup) => {
                if (!response) {
                    return;
                }
                const newEvent = response.getRawValue();
                newEvent.actions = this.actions;
                console.log(newEvent)
                this.ingresarFeriado(newEvent)
                this.events.push(newEvent);
                this.refresh.next(true);
            });
    }

    ingresarFeriado(feriadoNuevo) {
        if (feriadoNuevo.title != '') {
            this.httpClient.post(environment.url + '/agenda', {
                titulo: feriadoNuevo.title,
                color: feriadoNuevo.color.primary,
                fechaInicio: feriadoNuevo.start.toString().replace('00:00:00', feriadoNuevo.meta.horaInicio +':00'),
                fechaFin: feriadoNuevo.end.toString().replace('00:00:00', feriadoNuevo.meta.horaFin +':00') ,
                horaInicio: feriadoNuevo.meta.horaInicio,
                horaFin: feriadoNuevo.meta.horaFin,
                descripcion: feriadoNuevo.meta.notes,
                ubicacion: feriadoNuevo.meta.location,
                estudiante: feriadoNuevo.meta.estudiante,


            }, {headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('tokenUsuario')})})
                .subscribe(res => {
                    let aux: any;
                    aux = res;
                    this.httpClient.post(environment.url + '/agendaProfesor', {
                        usuarioId: localStorage.getItem('idProfesorRegistrado'),
                        agendaId: aux.identifiers[0].id,
                    }).subscribe(eje=>{

                    }, error => {

                    })
                })
        }
    }


    editarEvento(feriadoNuevo, id) {
        console.log('ok', feriadoNuevo)
        if (feriadoNuevo.title != '') {
            this.httpClient.put(environment.url + '/agenda/' + id, {
                titulo: feriadoNuevo.title,
                color: feriadoNuevo.color.primary,
                fechaInicio: feriadoNuevo.start,
                fechaFin: feriadoNuevo.end,
                horaInicio: feriadoNuevo.meta.horaInicio,
                horaFin: feriadoNuevo.meta.horaFin,
                descripcion: feriadoNuevo.meta.notes,
                ubicacion: feriadoNuevo.meta.location,
                estudiante: feriadoNuevo.meta.estudiante,


            }, {headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('tokenUsuario')})})
                .subscribe(res => {
                    console.log(res)
                })
        }
    }


}


