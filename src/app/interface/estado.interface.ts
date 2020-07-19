import {PaisInterface} from './pais.interface';

export interface EstadoInterface {

    id_estado?: number,
    nombre_estado: string,
    pais?: PaisInterface | number | any
}