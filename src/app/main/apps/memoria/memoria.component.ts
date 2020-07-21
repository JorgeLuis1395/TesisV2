import {Component, OnInit} from '@angular/core';
import {FuseSidebarService} from "../../../../@fuse/components/sidebar/sidebar.service";
import {MatDialog} from "@angular/material/dialog";
import Swal from "sweetalert2";

@Component({
    selector: 'app-memoria',
    templateUrl: './memoria.component.html',
    styleUrls: ['./memoria.component.scss']
})
export class MemoriaComponent implements OnInit {
    private images = [
        {id: 1, url: "/assets/imagenes/1.jpeg"},
        {id: 2, url: "/assets/imagenes/6.jpg"},
        {id: 3, url: "/assets/imagenes/7.jpg"},
        {id: 4, url: "/assets/imagenes/9.jpg"}
    ];
    public images_inact = "/assets/imagenes/poker.png";
    public cards = [];
    private last_select_id = null;
    private aciertos = 4;
    private count_aciertos = 0;
    public intentos = 12;
    public cont_intentos = 0;

    constructor(private _fuseSidebarService: FuseSidebarService,
                private _matDialog: MatDialog) {
    }

    ngOnInit() {
        let count_index = 0;
        for (let i = 0; i < this.aciertos * 2; i++) {
            if (count_index == this.aciertos) {
                count_index = 0;
            }
            let img = this.images[count_index];
            this.cards.push({
                id: img.id,
                url: img.url,
                visible: false, //si la imagen se muestra
                active: true //seleccionable
            });
            count_index++;
        }
        this.RandomArray(this.cards);
    }


    card_selected(idx) {
        if (!this.cards[idx].active) {
            return;
        }
        this.cards[idx].visible = true;

        if (this.last_select_id == null) {
            this.last_select_id = idx;
            this.cards[idx].visible = true;
            this.cards[idx].active = false;
        } else {
            if (this.cards[this.last_select_id].id == this.cards[idx].id) { //aumentar aciertos si coinciden
                this.count_aciertos++;
                this.cards[idx].visible = true;
                this.cards[idx].active = false;
                this.last_select_id = null;
            } else { //no hacen match

                let _this = this;
                setTimeout(function () {
                    _this.cards[_this.last_select_id].visible = false; //ocultar
                    _this.cards[_this.last_select_id].active = true; //activar
                    _this.cards[idx].visible = false;
                    _this.last_select_id = null;
                }, 0.2 * 1000)

            }
        }
        if (this.aciertos == this.count_aciertos) {
            //this.flashMensaje.show('Ganaste.', {cssClass: 'alert-success', timeout: 10000});
            //window.location.reload();
            this.ganaste()
        }
        if (this.cont_intentos == this.intentos - 1) {
            // this.flashMensaje.show('=( PERDISTE.', {cssClass: 'alert-success', timeout: 10000});
            //window.location.reload();
            this.perdiste()
        }
        this.cont_intentos++;

    }

    RandomArray(array) {
        let currentIndex = array.length, temporaryValue, randomIndex;

        while (0 !== currentIndex) {

            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
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
                window.location.reload();
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
                window.location.reload();
            }
        })
    }

    toggleSidebar(name): void {
        this._fuseSidebarService.getSidebar(name).toggleOpen();
    }


}
