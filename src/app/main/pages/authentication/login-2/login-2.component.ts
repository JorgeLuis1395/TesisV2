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
        this._fuseConfigService.config = {
            colorTheme: 'theme-default',
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
        const login = this.loginForm.value;
        this._login.postLogin(login.nick, login.password).then((result) => {
            aux = result
            console.log(result)
            localStorage.setItem('nick', login.nick);
           // environment.nick = login.nick
            localStorage.setItem('profesor',JSON.stringify(aux));
            localStorage.setItem('nombreUsuario',aux.nombre);
            localStorage.setItem('apellidoUsuario',aux.apellido);
            localStorage.setItem('correoUsuario',aux.email);
            localStorage.setItem('imagenUsuario',aux.fotoUsuario);
           // environment.profesor = aux;
            localStorage.setItem('tokenUsuario', aux.jwt);
           // environment.tokenUsuario = aux.jwt;
            this.getProfesor(login.nick)
        }, (err) => {
            this.registroIncorrecto()
        });
    }

    sendLoginEstudiante() {
        const login = this.loginForm.value;
        let aux: any
        this._login.postLoginEstudiante(login.nick, login.password).then((result) => {
            aux = result
            localStorage.setItem('nick', login.nick);
            // environment.nick = login.nick
            localStorage.setItem('estudiante', aux);
            localStorage.setItem('nombreUsuario',aux.nombre);
            localStorage.setItem('apellidoUsuario',aux.apellido);
            localStorage.setItem('correoUsuario',aux.email);
            localStorage.setItem('imagenUsuario',aux.fotoUsuario);
            // environment.profesor = aux;
            localStorage.setItem('tokenUsuario', aux.jwt);
            //environment.nick = login.nick;
            //environment.estudiante = result;
            //environment.tokenUsuario = Object.values(result)[0];
            this.getEstudiante()
        }, (err) => {
            this.registroIncorrecto()
        });
    }

    getSinRegistro() {
        localStorage.setItem('rol', 'INVITADO')
        const rutaHomeUsuario = [
            '/apps/home/welcome',
        ];
        this._router.navigate(rutaHomeUsuario);
    }

    getProfesor(nick) {
        this._usuario.getUsuario(nick).then(data => {
            console.log(data)
            this.usuario = data;

            localStorage.setItem('nombreUsuario',this.usuario.nombre);
            localStorage.setItem('apellidoUsuario',this.usuario.apellido);
            localStorage.setItem('correoUsuario',this.usuario.email);
            localStorage.setItem('imagenUsuario',this.usuario.nombreFoto);
            // environment.profesor = aux;
            localStorage.setItem('rol', 'PROFESOR');
           // environment.profesor = this.usuario;
           // environment.rol = 'PROFESOR'
            localStorage.setItem('idProfesorRegistrado', this.usuario.id);
           // environment.idProfesorRegistrado = this.usuario.id;
            this.registerNewNavigationAndToggle();
            const rutaHomeUsuario = [
                '/apps/home/welcome',
            ];
            this._router.navigate(rutaHomeUsuario);
        });
    }

    getEstudiante() {
        this._usuario.getEstudiante(localStorage.getItem('nick')).then(data => {
            this.usuario = data;
            localStorage.setItem('estudiante', JSON.stringify(this.usuario));
            // environment.profesor = aux;
            localStorage.setItem('rol', 'ESTUDIANTE');
            // environment.profesor = this.usuario;
            // environment.rol = 'PROFESOR'
            localStorage.setItem('idEstudianteRegistrado', this.usuario.id);
           // environment.estudiante = this.usuario;
          //  environment.idEstudianteRegistrado = this.usuario.id;
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

    registerNewNavigationAndToggle(): void {
        const adminNav = [
            {
                id: 'admin',
                title: 'DISLEXIA',
                type: 'group',
                icon: 'apps',
                children: [
                    {
                        id: 'dislexia1',
                        title: 'Que es la Dislexia',
                        type: 'item',
                        icon: 'filter_1',
                        url: '/ui/page-layouts/dislexia1',
                    },
                    {
                        id: 'dislexia2',
                        title: 'PRODISLEX',
                        type: 'item',
                        icon: 'filter_2',
                        url: '/ui/page-layouts/dislexia2'
                    },
                    {
                        id: 'dislexia3',
                        title: 'Adaptaciones generales para alumnos',
                        type: 'item',
                        icon: 'filter_3',
                        url: '/ui/page-layouts/dislexia4'
                    },
                    {
                        id: 'dislexia4',
                        title: 'Adaptaciones generales para exámenes',
                        type: 'item',
                        icon: 'filter_4',
                        url: '/ui/page-layouts/dislexia3'
                    },
                    {
                        id: 'dislexia5',
                        title: '7 Pasos para detectar la Dislexia',
                        type: 'item',
                        icon: 'filter_5',
                        url: '/ui/page-layouts/dislexia5'
                    }
                ]
            },
            {
                id: 'control-panel',
                title: 'ESTUDIANTES',
                type: 'group',
                icon: 'supervised_user_circle',
                children: [
                    {
                        id: 'cron-jobs',
                        title: 'Calificaciones',
                        type: 'item',
                        icon: 'spellcheck',
                        url: '/apps/file-manager'
                    },
                    {
                        id: 'maintenance-mode',
                        title: 'Lista',
                        type: 'item',
                        icon: 'format_list_numbered',
                        url: '/apps/e-commerce/products'
                    }
                ]
            },
            {
                id: 'agenda',
                title: 'AGENDA',
                type: 'group',
                icon: 'calendar_today',
                url: '/apps/todo'
            },

            {
                id: 'perfil',
                title: 'PERFIL',
                type: 'group',
                icon: 'apps',
                children: [
                    {
                        id: 'cron-jobs',
                        title: 'Cron Jobs',
                        type: 'item',
                        icon: 'settings',
                        url: '/apps/file-manager'
                    },
                    {
                        id: 'maintenance-mode',
                        title: 'Maintenance Mode',
                        type: 'item',
                        icon: 'build',
                        url: '/apps/todo'
                    }
                ]
            }
        ];

        // Register the new navigation
        this._fuseNavigationService.register('admin-nav', adminNav);

        // Set the current navigation
        this._fuseNavigationService.setCurrentNavigation('admin-nav');
    }


}
