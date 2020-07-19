import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {FuseConfigService} from '@fuse/services/config.service';
import {fuseAnimations} from '@fuse/animations';
import {UserInterface} from "../../../../interface/user.interface";
import {Router, RouterStateSnapshot} from "@angular/router";
import {LoginService} from "../../../servicios/login.service";
import {FuseNavigationService} from "../../../../../@fuse/components/navigation/navigation.service";
import {FuseSidebarService} from "../../../../../@fuse/components/sidebar/sidebar.service";
import {FuseSplashScreenService} from "../../../../../@fuse/services/splash-screen.service";
import {FuseTranslationLoaderService} from "../../../../../@fuse/services/translation-loader.service";
import {TranslateService} from "@ngx-translate/core";
import {UsuarioService} from "../../../servicios/usuario.service";
import {environment} from "../../../../../environments/environment";
import Swal from 'sweetalert2';

@Component({
    selector: 'login-2',
    templateUrl: './login-2.component.html',
    styleUrls: ['./login-2.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class Login2Component implements OnInit {
    loginForm: FormGroup;
    navigation = [];
    usuario: any;
    user: any;
    tipo_usuario: string;
    profesor?
    estudiante?
    //config: any;

    constructor(public _usuario: UsuarioService, private _login: LoginService,
                private _router: Router,
                private _fuseConfigService: FuseConfigService,
                private _formBuilder: FormBuilder,
                private authSvc: LoginService,
                private router: Router,
                private _fuseNavigationService: FuseNavigationService,
                private _fuseSidebarService: FuseSidebarService,
                private _fuseSplashScreenService: FuseSplashScreenService,
                private _fuseTranslationLoaderService: FuseTranslationLoaderService,
                private _translateService: TranslateService,
                private readonly _usuarioService: UsuarioService,
    ) {

        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true
                },
                toolbar: {
                    hidden: true
                },
                footer: {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        const snapshot: RouterStateSnapshot = this.router.routerState.snapshot;
        const root = snapshot.root;
        const queryParams = root.queryParams;

        if (queryParams.id && queryParams.autorizathion) {
        }

        this.loginForm = this._formBuilder.group({
            nick: ['', [Validators.required]],
            password: ['', Validators.required],
        });
    }


    ngOnDestroy(): void {

    }



    select() {
        console.log(this.tipo_usuario)
    }

    setNewUser(id: any): void {
        if (id == "Profesor") {
            this.sendLogin()
        } else {
            this.sendLoginEstudiante()
        }
    }

    sendLogin() {
        let aux: any;
        const login= this.loginForm.value;
        this._login.postLogin(login.nick, login.password).then((result) => {
            aux = result
            console.log(result)
            environment.nick = this.usuario;
            environment.tokenUsuario = aux.jwt;
            this.getProfesor(login.nick)
        }, (err) => {
            this.registroIncorrecto()
        });
    }

    sendLoginEstudiante() {
        const login= this.loginForm.value;
        this._login.postLoginEstudiante(login.nick, login.password).then((result) => {
            environment.nick = this.usuario;
            //environment.tokenUsuario = Object.values(result)[0];
            this.getEstudiante()
        }, (err) => {
            this.registroIncorrecto()
        });
    }

    getProfesor(nick) {
        this._usuario.getUsuario(nick).then(data => {
            console.log(data)
            this.usuario = data;
            environment.profesor= this.usuario;
            environment.idProfesorRegistrado = this.usuario.id;

            const rutaHomeUsuario = [
                '/apps/dashboards/project',
            ];
            this._router.navigate(rutaHomeUsuario);
        });
    }

    getEstudiante() {
        this._usuario.getEstudiante().then(data => {
            this.usuario = data;
            environment.estudiante= this.usuario;
            environment.idEstudianteRegistrado = this.usuario.id;
            const rutaHomeUsuario = [
                '/estudiante/wellcome',
            ];
            this._router.navigate(rutaHomeUsuario);
        });
    }
    async seleccionPerfil() {

        const {value: perfil} = await Swal.fire({
            title: 'Selecciona tu Perfil',
            input: 'select',
            icon: 'question',
            inputOptions: {
                profesor: 'Profesor',
                estudiante: 'Estudiante',
            },
            inputPlaceholder: 'Selecciona tu perfil',
            showCancelButton: true,
            inputValidator: (value) => {
                return new Promise((resolve) => {
                    if (value === 'profesor') {
                        resolve()
                        this.sendLogin()
                    } else {
                        if (value === 'estudiante') {
                            resolve()
                            this.sendLoginEstudiante()
                        }
                    }
                })
            }
        })

        if (perfil) {
            Swal.fire(`Tu perfil es: ${perfil}`)
        }
    }

    registroIncorrecto() {
        Swal.fire({
            title: 'Error!',
            text: 'Tus credenciales son incorrectas por favor intentalo de nuevo',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        })
    }

    private checkUserIsVerified(user: UserInterface) {
        /*if (user && user.emailVerified) {
            this.router.navigate(['/apps/academy/courses']);
        } else if (user) {
            this.router.navigate(['/verification-email']);
        } else {
            this.router.navigate(['/pages/auth/register']);
        }*/
    }

    resolved(captchaResponse: string) {
    }

}
