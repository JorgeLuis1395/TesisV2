
import {FuseUtils} from '@fuse/utils';

export class Product {
    id: string;
    nombre: string;
    apellido: string;
    email: string;
    nick: string;
    password: string;
    cedula: string;
    codigo_estudiante: string;
    fecha_nacimiento: string;
    grado: number;
    telefono: string;
    unidad_educativa: string;
    nombreFoto: string;
    rol: string;

    /**
     * Constructor
     *
     * @param product
     */
    constructor(product?) {
        product = product || {};
        this.nombre = product.nombre || '';
        this.apellido = product.apellido;
        this.email = product.email || '';
        this.nick = product.nick || '';
        this.password = product.password || '';
        this.cedula = product.cedula || ''
        this.codigo_estudiante = product.codigo_estudiante || '';
        this.fecha_nacimiento = product.fecha_nacimiento || '';
        this.grado = product.grado || '';
        this.telefono = product.telefono || ''
        this.unidad_educativa = product.unidad_educativa || '';
        this.nombreFoto = product.nombreFoto || '';

    }

}
