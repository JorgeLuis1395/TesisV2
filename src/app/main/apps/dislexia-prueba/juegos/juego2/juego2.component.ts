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

      console.log(buttonSelect.textContent.toString().trim() !== this.palabraCorrecta.toString(),buttonSelect.textContent.toString().trim() , this.palabraCorrecta)
    if(buttonSelect.textContent.toString().trim() !== this.palabraCorrecta.toString().trim()){

        console.log(DislexiaVisualComponent.puntajeJuego2)
      DislexiaVisualComponent.puntajeJuego2 = DislexiaVisualComponent.puntajeJuego2 - 16 ;
    }

    this.dislexiaComponente.siguientePalabra();
     }

}
