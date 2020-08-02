import {FuseUtils} from '@fuse/utils';

export class Calificacion {
    tipo: string;
    detalle: string;
    materia: string;
    calificacion: string;

    /**
     * Constructor
     *
     * @param product
     */
    constructor(product?) {
        product = product || {};
        this.tipo = product.tipo || '';
        this.detalle = product.detalle;
        this.materia = product.materia || '';
        this.calificacion = product.calificacion || '';


    }
}