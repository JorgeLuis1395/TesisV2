import {Roles} from './user.interface';

export interface CursoInterface {
    id: string;
    nombre_curso: string;
    codigo_curso?: string;
    descripcion_curso?: string;
    categoria?: string[];
    etiqueta?: string[];
    imagen_curso?: string;
    costo1?: number;
    costo2?: number;
    cupo_min?: number;
    cupo_max?: number;
    fecha_curso_inicio?: Date;
    hora_curso_inicio?: string;
    fecha_curso_fin?: Date;
    hora_curso_fin?: string;
    estado?: boolean;
    enlace_classroom?: string;
    role?: Roles;
}