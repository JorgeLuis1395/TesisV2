
import {CursoInterface} from './curso.interface';

export interface ModuloInterface {
    id_modulo: string;
    nombre_modulo: string;
    descripcion_modulo: string;
    mater_ruta_modulo: string;
    fecha_inicio_modulo: string;
    fecha_fin_modulo: string;
    curso?: CursoInterface;
}