import {ZoomInterface} from './zoom.interface';
import {CursoInterface} from './curso.interface';

export interface AulaInterface {

    id_aula?: number,
    nombre_aula?: string,
    capacidad?: number,
    fecha_inicio?: Date | string,
    fecha_fin?: Date | string,
    hora_aula_inicio?: string,
    hora_aula_fin?: string,
    curso?: CursoInterface | number | any,
    zoom?: ZoomInterface | number | any,

}