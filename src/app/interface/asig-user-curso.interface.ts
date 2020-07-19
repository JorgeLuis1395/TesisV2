import {CursoInterface} from './curso.interface';
import {UsuarioRolInterface} from './usuario-rol.interface';
import {CuentaInterface} from './cuenta.interface';
import {ClienteEmpresaInterface} from './cliente-empresa.interface';

export interface AsigUserCursoInterface {

    id_asig_estu_curso?: number,
    nombre_aula?: string,
    capacidad?: number,
    inscripcion?: boolean,
    matricula?: boolean,
    curso?: CursoInterface | number | any,
    usuario_rol?: UsuarioRolInterface | number | any,
    cuenta?: CuentaInterface | number | any,
    empresa?: ClienteEmpresaInterface | number | any

}