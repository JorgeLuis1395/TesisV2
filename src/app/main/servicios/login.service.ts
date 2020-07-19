import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import * as CryptoJS from 'crypto-js';
import {UserInterface} from "../../interface/user.interface";
import {FuseNavigationService} from "../../../@fuse/components/navigation/navigation.service";
import {environment} from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    public user$: Observable<UserInterface>;

    constructor(
        private router: Router,
        private readonly _httpClient: HttpClient,
        private _fuseNavigationService: FuseNavigationService,
    ) {

    }

    /*async loginGoogle(): Promise<User> {
        try {
            const {user} = await this.afAuth.signInWithPopup(
                new auth.GoogleAuthProvider()
            );
            console.log(user);
            this.updateUserData(user);
            return user;
        } catch (error) {
            console.log(error);
        }
    }*/

    async resetPassword(email: string): Promise<any> {
        try {
            const res = await this._httpClient.post(environment.url + 'sendemail/recovery', {
                nombre_login: email
            })
                .toPromise()
                .then(result => result)
                .catch(error => alert(error.error.message));

            if (res) {
                alert('Revise su correo para poder recuperar la contraseña');
                this.router.navigate(['/pages/auth/login'])
            }

        } catch (error) {
            console.log(error);
        }
    }


    async login(nick: string, password: string) {
        try {
            let token = await this._httpClient.post(environment.url + 'autenticacion', {
                nick: nick,
                password: password
            }).toPromise()
                .then(result => result)
                .catch(error => alert(error.error.message));
            return token;
        } catch (error) {
            console.log(error);
        }
    }

    /*async register(email: string, password: string): Promise<User> {
        try {
            const {user} = await this.afAuth.createUserWithEmailAndPassword(
                email,
                password
            );
            await this.sendVerificationEmail();
            return user;
        } catch (error) {
            console.log(error);
        }
    }*/

    async logout(): Promise<void> {
        try {
            //await this.afAuth.signOut();
            localStorage.getItem('currentUser');
            localStorage.removeItem('currentUser');
            localStorage.clear();
            this._fuseNavigationService.unregister('main');
            window.location.replace("/#/pages/auth/login");
        } catch (error) {
            console.log(error);
        }
    }

    /*private updateUserData(user: User) {
        const userRef: AngularFirestoreDocument<User> = this.afs.doc(
            `users/${user.id_usuario}`
        );

        const data: User = {
            uid: user.uid,
            correo_usuario: user.correo_usuario,
            foto_usuario: user.foto_usuario,
            role: 'ADMIN',
            emailVerified: user.emailVerified
        };

        return userRef.set(data, {merge: true});
    }*/


    setCurrentUser(tokenUser, decodeToken, user): void {
        localStorage.setItem('currentUser', JSON.stringify({
            token: tokenUser,
            id_usuario: CryptoJS.AES.encrypt(decodeToken.data.id_usuario.toString(), environment.tokenKey).toString(),
            nombre_login: CryptoJS.AES.encrypt(decodeToken.data.nombre_login.toString(), environment.tokenKey).toString(),
            rol: CryptoJS.AES.encrypt(decodeToken.data.rol.toString(), environment.tokenKey).toString(),
            estado_usuario: CryptoJS.AES.encrypt(decodeToken.data.estado.toString(), environment.tokenKey).toString(),
            estado_usuario_cuenta: CryptoJS.AES.encrypt(decodeToken.data.estado_cuenta.toString(), environment.tokenKey).toString(),
            nombres_usuario: CryptoJS.AES.encrypt(decodeToken.data.nombres.toString(), environment.tokenKey).toString(),
            apellidos_usuario: CryptoJS.AES.encrypt(decodeToken.data.apellidos.toString(), environment.tokenKey).toString(),
            id_usuario_rol: CryptoJS.AES.encrypt(decodeToken.data.id_usuario_rol.toString(), environment.tokenKey).toString(),
            usuario: user
        }));
    }

    getToken() {
        var bytes = CryptoJS.AES.decrypt(JSON.parse(localStorage.getItem('currentUser')).token, environment.tokenKey);
        return bytes.toString(CryptoJS.enc.Utf8);
    }

    setUsuario(usuario) {

        const user = JSON.parse(localStorage.getItem("currentUser"));
        user.usuario = usuario;
        localStorage.setItem("currentUser", JSON.stringify(user));
    }

    getUsuario() {
        /*var bytes = CryptoJS.AES.decrypt(JSON.parse(localStorage.getItem('currentUser')).usuario, environment.tokenKey);
        return bytes.toString(CryptoJS.enc.Utf8);*/
        return JSON.parse(localStorage.getItem('currentUser')).usuario;
    }

    getIdUsuarioRol() {
        var bytes = CryptoJS.AES.decrypt(JSON.parse(localStorage.getItem('currentUser')).id_usuario_rol, environment.tokenKey);
        return bytes.toString(CryptoJS.enc.Utf8);
    }

    getIdUsuario() {
        var bytes = CryptoJS.AES.decrypt(JSON.parse(localStorage.getItem('currentUser')).id_usuario, environment.tokenKey);
        return bytes.toString(CryptoJS.enc.Utf8);
    }

    getNombreLogin() {
        var bytes = CryptoJS.AES.decrypt(JSON.parse(localStorage.getItem('currentUser')).nombre_login, environment.tokenKey);
        return bytes.toString(CryptoJS.enc.Utf8);
    }

    getRol() {
        var bytes = CryptoJS.AES.decrypt(JSON.parse(localStorage.getItem('currentUser')).rol, environment.tokenKey);
        return bytes.toString(CryptoJS.enc.Utf8);
    }

    getEstado() {
        var bytes = CryptoJS.AES.decrypt(JSON.parse(localStorage.getItem('currentUser')).estado_usuario, environment.tokenKey);
        return bytes.toString(CryptoJS.enc.Utf8);
    }

    getEstadoCuenta() {
        var bytes = CryptoJS.AES.decrypt(JSON.parse(localStorage.getItem('currentUser')).estado_usuario_cuenta, environment.tokenKey);
        return bytes.toString(CryptoJS.enc.Utf8);
    }

    getNombres() {
        var bytes = CryptoJS.AES.decrypt(JSON.parse(localStorage.getItem('currentUser')).nombres_usuario, environment.tokenKey);
        return bytes.toString(CryptoJS.enc.Utf8);
    }

    getApellidos() {
        var bytes = CryptoJS.AES.decrypt(JSON.parse(localStorage.getItem('currentUser')).apellidos_usuario, environment.tokenKey);
        return bytes.toString(CryptoJS.enc.Utf8);
    }

    isLoggedIn(): boolean {
        const user = localStorage.getItem('currentUser');
        return (user !== null) ? true : false;
    }

    logOut() {
        localStorage.getItem('currentUser');
        localStorage.removeItem('currentUser');
    }

    apiUrl = environment.url;

    postLogin(nick, password) {
        const param = {
            nick,
            password,
        };

        return new Promise((resolve, reject) => {
            this._httpClient.post(this.apiUrl + '/autenticacion', param)
                .subscribe(res => {
                    resolve(res);
                }, (err) => {
                    reject(err);
                });
        });
    }

    postLoginEstudiante(nick, password) {
        const param = {
            nick,
            password,
        };

        return new Promise((resolve, reject) => {
            this._httpClient.post(this.apiUrl + '/autenticacionestudiante', param)
                .subscribe(res => {
                    resolve(res);
                }, (err) => {
                    reject(err);
                });
        });
    }



}