import { Injectable } from '@angular/core';
import {AbstractControl} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidacionesService {
  constructor() {
  }


  letrasNumeros(evento, tipo) {
    var key = evento.keyCode || evento.which;
    var tecla = String.fromCharCode(key).toLowerCase();
    var input = 'áéíóúabcdefghijklmnñopqrstuvwxyz0123456789';
    if (tipo == 'l') {
      input = 'áéíóúabcdefghijklmnñopqrstuvwxyz';
    } else if (tipo == 'n') {
      input = '0123456789';
    }
    var especiales = [8, 32, 46, 45];
    var tecla_especial = false
    for (var i in especiales) {
      if (key == especiales[i]) {
        tecla_especial = true;
        break;
      }
    }

    if (input.indexOf(tecla) == -1 && !tecla_especial) {
      return false;
    }
  }

  cedula(control: AbstractControl) {
    const cedulaRuc = control.value;
    let error = null;
    if (cedulaRuc.length == 10 || cedulaRuc.length == 13) {
      var digitoRegion = cedulaRuc.substring(0, 2);
      if (digitoRegion >= 1 && digitoRegion <= 24) {
        var tercerDigito = cedulaRuc.substring(2, 3);
        //RUC o Cédula personal
        if (tercerDigito >= 0 && tercerDigito <= 5) {
          var ultimoDigito = cedulaRuc.substring(9, 10);
          var pares = parseInt(cedulaRuc.substring(1, 2)) + parseInt(cedulaRuc.substring(3, 4)) + parseInt(cedulaRuc.substring(5, 6)) + parseInt(cedulaRuc.substring(7, 8));

          var numero1 = (cedulaRuc.substring(0, 1) * 2);
          if (numero1 > 9) numero1 = (numero1 - 9);

          var numero3 = (cedulaRuc.substring(2, 3) * 2);
          if (numero3 > 9) numero3 = (numero3 - 9);

          var numero5 = (cedulaRuc.substring(4, 5) * 2);
          if (numero5 > 9) numero5 = (numero5 - 9);

          var numero7 = (cedulaRuc.substring(6, 7) * 2);
          if (numero7 > 9) numero7 = (numero7 - 9);

          var numero9 = (cedulaRuc.substring(8, 9) * 2);
          if (numero9 > 9) numero9 = (numero9 - 9);

          var impares = numero1 + numero3 + numero5 + numero7 + numero9;
          var sumaTotal = (pares + impares);
          var primerDigitoSuma = String(sumaTotal).substring(0, 1);
          var decena = (parseInt(primerDigitoSuma) + 1) * 10;
          var digitoValidador = decena - sumaTotal;

          if (digitoValidador == 10) digitoValidador = 0;

          if (digitoValidador == ultimoDigito) {
            error = null;
          }
          else {
            error = {error, estado: 'Incorrecto'};
          }
        }
        //RUC de persona jurídica
        else if (tercerDigito == 9 && cedulaRuc.length == 13) {
          var ultimoDigito = cedulaRuc.substring(9, 10);
          var digitoUno = parseInt(cedulaRuc.substring(0, 1)) * 4;
          var digitoDos = parseInt(cedulaRuc.substring(1, 2)) * 3;
          var digitoTres = parseInt(cedulaRuc.substring(2, 3)) * 2;
          var digitoCuatro = parseInt(cedulaRuc.substring(3, 4)) * 7;
          var digitoCinco = parseInt(cedulaRuc.substring(4, 5)) * 6;
          var digitoSeis = parseInt(cedulaRuc.substring(5, 6)) * 5;
          var digitoSiete = parseInt(cedulaRuc.substring(6, 7)) * 4;
          var digitoOcho = parseInt(cedulaRuc.substring(7, 8)) * 3;
          var digitoNueve = parseInt(cedulaRuc.substring(8, 9)) * 2;

          var sumaTotal = digitoUno + digitoDos + digitoTres + digitoCuatro + digitoCinco + digitoSeis + digitoSiete + digitoOcho + digitoNueve;
          var modSumaTotal = (sumaTotal % 11);
          var resultado = 0;
          if (modSumaTotal > 0)
            resultado = 11 - modSumaTotal;

          if (resultado == ultimoDigito) {
            error = null;
          } else {
            error = {error, estado: 'Incorrecto'};
          }
        }
        //RUC Institucion Publica
        else if (tercerDigito == 6 && cedulaRuc.length == 13) {
          var ultimoDigito = cedulaRuc.substring(8, 9);
          var digitoUno = parseInt(cedulaRuc.substring(0, 1)) * 3;
          var digitoDos = parseInt(cedulaRuc.substring(1, 2)) * 2;
          var digitoTres = parseInt(cedulaRuc.substring(2, 3)) * 7;
          var digitoCuatro = parseInt(cedulaRuc.substring(3, 4)) * 6;
          var digitoCinco = parseInt(cedulaRuc.substring(4, 5)) * 5;
          var digitoSeis = parseInt(cedulaRuc.substring(5, 6)) * 4;
          var digitoSiete = parseInt(cedulaRuc.substring(6, 7)) * 3;
          var digitoOcho = parseInt(cedulaRuc.substring(7, 8)) * 2;

          var sumaTotal = digitoUno + digitoDos + digitoTres + digitoCuatro + digitoCinco + digitoSeis + digitoSiete + digitoOcho;
          var modSumaTotal = (sumaTotal % 11);
          var resultado = 0;
          if (modSumaTotal > 0)
            resultado = 11 - modSumaTotal;

          if (resultado == ultimoDigito) {
            error = null;
          } else {
            error = {error, estado: 'Incorrecto'};
          }
        }
        else {
          error = {error, estado: 'Incorrecto'};
        }
      } else {
        error = {error, region: 'Region'};
      }
    } else {
      error = {error, taman: 'Tamanio'};
    }
    return error;
  }

  edad(fechaNacimiento): number {
    var hoy = new Date();
    var fecha = new Date(fechaNacimiento);
    var edad = (hoy.getFullYear() - fecha.getFullYear());
    if (fecha.getMonth() > hoy.getMonth()) {
      edad--;
    } else if ((fecha.getMonth() == hoy.getMonth()) && (fecha.getDate() >= hoy.getDate())) {
      edad--;
    }
    return edad;
  }

  fechaNacimiento(control: AbstractControl) {
    const fecha = new Date(control.value);
    var hoy = new Date();
    let error = null;

    var year = (hoy.getFullYear() - fecha.getFullYear());

    if (year == 18) {
      if (fecha.getMonth() > hoy.getMonth()) {
        error = {error, menor: 'Menor'};
      } else if (fecha.getMonth() == hoy.getMonth()) {
        if (fecha.getDate() >= hoy.getDate()) {
          error = {error, menor: 'Menor'};
        } else {
          error = null;
        }
      } else {
        error = null;
      }
    } else if (year > 18) {
      error = null;
    } else if (year < 18) {
      error = {error, menor: 'Menor'};
    }
    return error;
  }
}
