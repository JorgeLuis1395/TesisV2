import {CiudadInterface} from './ciudad.interface';

export type Roles = 'PROFESOR' | 'ESTUDIANTE' | 'ADMIN';

export interface UserInterface {

    id_usuario?: number,
    identificacion_usuario?: string,
    nombres_usuario?: string,
    apellidos_usuario?: string,
    fecha_naci_usuario?: Date,
    correo_usuario?: string,
    correo_empresa?: string,
    foto_usuario?: string,
    telefono_usuario?: string,
    nivel_estu_usuario?: string,
    direccion_usuario?: string,
    institucion_usuario?: string,
    sexo_usuario?: string,
    estado_usuario?: boolean,
    estado_usuario_cuenta?: boolean,
    ciudad?: CiudadInterface | number | any,
    role?: Roles,
    seleccionado?: boolean
}