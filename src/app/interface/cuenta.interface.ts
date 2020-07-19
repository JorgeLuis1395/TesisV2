import {LoginInterface} from './login.interface';
import {UserInterface} from './user.interface';

export interface CuentaInterface {

    login: LoginInterface,
    user: UserInterface
    nombre_rol: string

}