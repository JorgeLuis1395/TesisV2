import {Component, Input, OnInit} from '@angular/core';
import {DislexiaVisualComponent} from "../../dislexia-visual/dislexia-visual.component";

@Component({
  selector: 'app-juego2',
  templateUrl: './juego2.component.html',
  styleUrls: ['./juego2.component.css']
})
export class Juego2Component implements OnInit {


  @Input() nombre:string;
  @Input() indice:number;
  @Input() palabraCorrecta:string;

  constructor(
    private dislexiaComponente : DislexiaVisualComponent
  ) { }

  ngOnInit() {
  }

  seleccionoButton() {

    var buttonSelect = document.getElementById('button'+this.indice);


    if(buttonSelect.textContent != this.palabraCorrecta){
      DislexiaVisualComponent.puntajeJuego2 = DislexiaVisualComponent.puntajeJuego2 - 5;
    }

    this.dislexiaComponente.siguientePalabra();
     }

}
