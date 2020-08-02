import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-caja',
  templateUrl: './caja.component.html',
  styleUrls: ['./caja.component.css']
})
export class CajaComponent implements OnInit {

  @Input() letra: string;
  @Input() indice: number;
  @Input() indice2: number;

  constructor() { }

  ngOnInit() {

  }

  seleccionoLetra() {

    var valor = document.getElementById('caja'+this.indice);
    if (this.letra === valor.textContent){
      valor.className = 'cajas fondo'
      valor.style.color = 'black';
      valor.onmousedown = function () {
        return false;
      }
    }
    else {
      valor.style.backgroundColor = 'red';
      valor.style.color = 'blue'
      if(valor.textContent === ''){
        valor.style.backgroundColor = 'yellow';
      }
    }
  }

}
