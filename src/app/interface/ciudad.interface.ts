import {EstadoInterface} from './estado.interface';

export interface CiudadInterface {

    id_ciudad?: number,
    nombre_ciudad: string,
    estado?: EstadoInterface | number | any

}