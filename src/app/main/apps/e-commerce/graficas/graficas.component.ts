import {Component, OnInit} from '@angular/core';
import * as Highcharts from 'highcharts'
import {HttpClient} from "@angular/common/http";
import {UsuarioService} from "../../../servicios/usuario.service";
import {BehaviorSubject} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {environment} from "../../../../../environments/environment";

@Component({
    selector: 'app-graficas',
    templateUrl: './graficas.component.html',
    styleUrls: ['./graficas.component.scss']
})
export class GraficasComponent implements OnInit {
    usuario= environment.nombreUsuario;
    foto = environment.fotoUsuario


    title = 'Dislexia Visual';

    data = [{
        name: 'Dislexia Visual',
        data: environment.dislexiaVisual
    },]

    highcharts = Highcharts;
    chartOptions = {
        colors: ['#5796e2', '#8085e9', '#8d4654', '#7798BF', '#aaeeee',
            '#ff0066', '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
        chart: {
            type: 'area',
            backgroundColor: {
                linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
                stops: [
                    [0, '#3e3e40'],
                    [1, '#e5e5e9']
                ]
            },

            style: {
                fontFamily: '\'Unica One\', sans-serif'
            },
            plotBorderColor: '#606063'
        },
        title: {
            text: "Dislexia Visual",
            style: {
                color: '#E0E0E3',
                textTransform: 'uppercase',
                fontSize: '20px'
            }
        },
        xAxis: {
           // categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        },
        yAxis: {
            title: {
                text: "Evolución",
                style: {
                    color: '#E0E0E3',
                    textTransform: 'uppercase',
                    fontSize: '20px'
                }
            }

        },
        series: this.data,
        style: {
            color: '#E0E0E3',
            textTransform: 'uppercase',
            fontSize: '20px'
        }
    };


    title1 = 'Dislexia Fonológica';

    data1 = [{
        name: 'Dislexia Fonológica',
        data: environment.dislexiaFonologica
    },]

    highcharts1 = Highcharts;
    chartOptions1 = {
        colors: ['#a1ee4f', '#8085e9', '#8d4654', '#7798BF', '#aaeeee',
            '#ff0066', '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
        chart: {
            type: 'area',
            backgroundColor: {
                linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
                stops: [
                    [0, '#e5e5e9'],
                    [1, '#5555d6']
                ]
            },

            style: {
                fontFamily: '\'Unica One\', sans-serif'
            },
            plotBorderColor: '#f4f4f6'
        },
        title: {
            text: "Dislexia Fonológica",
            style: {
                color: '#E0E0E3',
                textTransform: 'uppercase',
                fontSize: '20px'
            }
        },
        xAxis: {
            // categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        },
        yAxis: {
            title: {
                text: "Evolución",
                style: {
                    color: '#E0E0E3',
                    textTransform: 'uppercase',
                    fontSize: '20px'
                }
            }

        },
        series: this.data1,
        style: {
            color: '#E0E0E3',
            textTransform: 'uppercase',
            fontSize: '20px'
        }
    };

    ngOnInit(): void {


    }
/*
    getProducts(): void {
        let auxPuntaje: any;
        this.listaEstudiantes.getEstudianteId(this.route.snapshot.params.id).then(data => {
            console.log(data)
            this.usuario = data;
            auxPuntaje = this.usuario.puntaje
            console.log(auxPuntaje);
            for(let i=0; i<auxPuntaje.length; i++){
                console.log(auxPuntaje[i]);
                if(auxPuntaje[i].detalle === 'Dislexia Fonológica'){
                    console.log('ok')
                    this.dislexiaFonologica.push(parseInt(auxPuntaje[i].puntaje))
                }
                if(auxPuntaje[i].detalle === 'Dislexia Visual'){

                    this.dislexiaVisual.push(parseInt(auxPuntaje[i].puntaje))
                }
            }

        },);
    }*/

}
