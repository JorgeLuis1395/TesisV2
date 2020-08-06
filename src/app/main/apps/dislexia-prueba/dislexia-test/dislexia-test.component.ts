import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UsuarioService} from "../../../servicios/usuario.service";
import {environment} from "../../../../../environments/environment";
import {fuseAnimations} from "../../../../../@fuse/animations";

@Component({
    selector: 'app-dislexia-test',
    templateUrl: './dislexia-test.component.html',
    styleUrls: ['./dislexia-test.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class DislexiaTestComponent implements OnInit {
    aux: any;
    idPuntaje: number;
    palabra: string;
    estadoFinalJuego = false;
    vocal: string
    arregloPalabra = [];
    arregloVocales = [];
    estado = false;
    contador: number = 0;
    ruta;
    imprimir: string
    Puntaje = 100;
    palabras = [['leon', '../assets/imagenes/leon.gif'],
        ['SaPo', '/assets/imagenes/sapo.png'],
        ['pelota', '/assets/imagenes/pelota.png'],
        ['CaRRo', '/assets/imagenes/carro.png'],
        ['trompeta', '/assets/imagenes/trompeta.png'],
        ['NiÑo', '/assets/imagenes/nino.png'],
        ['murcielago', '/assets/imagenes/murcielago.png'],
        ['eNaNo', '/assets/imagenes/enano.png'],];

    vocales = ['aeiou', 'AEIOU', 'aeiou', 'AEIOU', 'aeiou', 'AEIOU', 'aeiou', 'AEIOU'];

    constructor(
        private http: HttpClient, private usuario: UsuarioService
    ) {
    }

    ngOnInit() {
        this.runJuego(this.palabras[0][0], this.palabras[0][1], this.vocales[0]);
        if (this.contador === this.palabras.length - 1) {
            this.arregloPalabra = [];
            this.contador = 0;
            this.ruta = ''
            this.estado = false;
            document.getElementById('buttonNext').style.display = 'none';
            document.getElementById('buttonFinish').style.display = 'initial';
        }
    }

    public calcularPuntaje() {
        var valor;
        for (let i = 0; i < this.palabra.length; i++) {
            valor = document.getElementById('caja' + i).textContent;

            if (valor === 'A') {
                valor = 'a';
            }
            if (valor === 'E') {
                valor = 'e';
            }
            if (valor === 'I') {
                valor = 'i';
            }
            if (valor === 'O') {
                valor = 'o';
            }
            if (valor === 'U') {
                valor = 'u';
            }


            if (this.palabra[i] === valor) {
                console.log(this.palabra[i], valor, this.Puntaje, this.palabra)
                this.imprimir = 'tu puntaje es: ' + this.Puntaje;

            } else {
                console.log(this.palabra[i], valor, this.Puntaje, this.palabra)
                this.Puntaje = this.Puntaje - 5;
            }

        }
    }


    runJuego(palabra: string, ruta: string, vocales: string) {
        this.arregloPalabra = [];
        this.arregloVocales = [];
        this.palabra = palabra;
        for (let i = 0; i < this.palabra.length; i++) {
            this.arregloPalabra[i] = this.palabra.slice(i, i + 1);
        }
        this.vocal = vocales;
        for (let i = 0; i < this.vocal.length; i++) {
            this.arregloVocales[i] = this.vocal.slice(i, i + 1);
        }
        this.ruta = ruta;
        this.estado = true;
    }

    nextWord() {

        if (this.contador === this.palabras.length - 1) {
            this.estadoFinalJuego = true;
            this.estado = false;
            this.ruta = '/assets/imagenes/pikachu.gif'
            document.getElementById('buttonNext').style.display = 'none';
            document.getElementById('buttonFinish').style.display = 'initial';
            this.arregloPalabra = [];
            this.contador = 0;


        } else {
            this.calcularPuntaje();
            this.contador++;
            document.getElementById('caja0').textContent = '';
            document.getElementById('caja1').textContent = '';
            document.getElementById('caja2').textContent = '';
            document.getElementById('caja3').textContent = '';
            this.runJuego(this.palabras[this.contador][0], this.palabras[this.contador][1], this.vocales[this.contador]);
        }
    }

    savePuntaje() {

        this.usuario.postPuntaje(this.Puntaje.toString(), 'Dislexia Fonológica').then((result) => {

            this.aux = Object.values(result)[1][0];
            this.idPuntaje = parseInt(Object.values(this.aux)[0].toString());
            this.estudiantePuntaje();
        }, (err) => {

        });
    }

    estudiantePuntaje() {

        this.usuario.savePuntajeEstudiante(localStorage.getItem('idEstudianteRegistrado'),
            this.idPuntaje,
        ).then((result) => {
            result

        }, (err) => {
        });
    }


}
