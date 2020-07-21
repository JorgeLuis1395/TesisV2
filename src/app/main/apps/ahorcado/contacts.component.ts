import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {Subject} from 'rxjs';

import {fuseAnimations} from '@fuse/animations';
import {FuseSidebarService} from '@fuse/components/sidebar/sidebar.service';

import Swal from "sweetalert2";

@Component({
    selector: 'contacts',
    templateUrl: './contacts.component.html',
    styleUrls: ['./contacts.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ContactsComponent implements OnInit, OnDestroy {
    participantes = ['ARAÑA', 'BURRO', 'CARRO', 'DADO', 'ELEFANTE', 'FOCA', 'GATO', 'HOJA', 'IGUANA', 'JIRAFA', 'LEON', 'MURCIELAGO', 'NIDO', 'OSO', 'PELOTA', 'QUESO', 'RATON', 'SAPO', 'TOMATE', 'UNO', 'SIETE', 'SEIS', 'NUEVE'];
    imagenes = ['araña.PNG', 'burro.PNG', 'carro.PNG', 'dado.PNG', 'elefante.PNG', 'foca.PNG', 'gato.PNG', 'hoja.PNG', 'iguana.PNG', 'jirafa.PNG', 'leon.PNG', 'murcielago.PNG', 'nido.PNG', 'oso.PNG', 'pelota.PNG', 'queso.PNG', 'raton.PNG', 'sapo.PNG', 'tomate.PNG', 'UNO.PNG', 'siete.PNG', '6.jpg', '9.jpg'];
    numero_participantes = this.participantes.length;
    numero: any;

    palabra: any;
    imagen: any
    palabraOculta = '';

    intentos = 0;

    gano = false;
    perdio = false;


    letras : any;

    dialogRef: any;
    hasSelectedContacts: boolean;
    searchInput: FormControl;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ContactsService} _contactsService
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {MatDialog} _matDialog
     */
    constructor(
        private _fuseSidebarService: FuseSidebarService,
        private _matDialog: MatDialog
    ) {
        this.letras = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
            'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S',
            'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        // Set the defaults
        this.searchInput = new FormControl('');

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.gano = false;
        this.perdio = false;
        this.letras = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
            'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S',
            'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        this.numero = Math.floor(Math.random() * this.numero_participantes)
        this.palabra = this.participantes[this.numero];
        this.imagen = this.imagenes[this.numero];
        this.intentos = 0;


        this.palabraOculta = '_ '.repeat(this.palabra.length);

    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    comprobar(letra) {

        this.existeLetra(letra);

        const palabraOcultaArr = this.palabraOculta.split(' ');

        for (let i = 0; i < this.palabra.length; i++) {

            if (this.palabra[i] === letra) {
                palabraOcultaArr[i] = letra;
            }

        }

        this.palabraOculta = palabraOcultaArr.join(' ');
        this.verificaGane();

    }

    verificaGane() {

        const palabraArr = this.palabraOculta.split(' ');
        const palabraEvaluar = palabraArr.join('');
        for (let i = 0; i < this.palabra.length; i++) {
            if (palabraEvaluar === this.palabra) {
                this.gano = true;
                this.ganaste()
            }

            if (this.intentos >= 9) {
                this.perdio = true;
                this.perdiste()
            }
        }
    }


    existeLetra(letra) {

        if (this.palabra.indexOf(letra) >= 0) {
        } else {

            this.intentos++;
        }

    }

    consultarNuevaPalabra() {
        this.ngOnInit()
    }

    perdiste() {
        Swal.fire({
            title: 'Se te acabaron los intentos. Por favor intentalo de nuevo',
            width: 600,
            padding: '3em',
            background: '#fff url(/images/trees.png)',
            backdrop: `
    rgba(0,0,123,0.4)
    url("https://gifsanimados.de/img-gifsanimados.de/c/caritas/carita-lagrima.gif")
    center top
    no-repeat
  `,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Quieres intentarlo de nuevo'
        }).then((result) => {
            if (result.value) {
                this.ngOnInit()
            }
        })
    }

    ganaste() {
        Swal.fire({
            title: 'Felicitaciones !!!! Ganaste que excelente memoria',
            width: 600,
            padding: '3em',
            background: '#fff url(/images/trees.png)',
            backdrop: `
    rgba(0,0,123,0.4)
    url("https://gifsanimados.de/img-gifsanimados.de/c/caritas/carita-guino.gif")
    center top
    no-repeat
  `,
            showCancelButton: true,
            confirmButtonColor: '#49d630',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Quieres jugar otra vez'
        }).then((result) => {
            if (result.value) {
                this.ngOnInit()
            }
        })
    }

    /**
     * Toggle the sidebar
     *
     * @param name
     */
    toggleSidebar(name): void {
        this._fuseSidebarService.getSidebar(name).toggleOpen();
    }
}
