import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import Swal from "sweetalert2";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subject} from "rxjs";
import {UsuarioService} from "../../servicios/usuario.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {fuseAnimations} from "../../../../@fuse/animations";


@Component({
    selector: 'app-perfil',
    templateUrl: './perfil.component.html',
    styleUrls: ['./perfil.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class PerfilComponent implements OnInit {
    about: any;
    usuarioForm: FormGroup;
    rol = '';
    fecha_nacimiento = ' ';
    identificacion_usuario = '';

    nombreArchivo: string;

    // Horizontal Stepper
    horizontalStepperStep0: FormGroup;
    horizontalStepperStep1: FormGroup;
    horizontalStepperStep2: FormGroup;
    horizontalStepperStep3: FormGroup;
    horizontalStepperStep4: FormGroup;
    horizontalStepperStep5: FormGroup;
    horizontalStepperStep6: FormGroup;

    public imagePath;
    path: string;
    imgURL: any;
    imagenUsuario: File;
    public message: string;

    // Private
    private _unsubscribeAll: Subject<any>;
    private imagenSelecionada: string;
    imagenSelecionada1: string;
    usuarioRol = localStorage.getItem('rol');

    // @ts-ignore
    /**
     * Constructor
     *
     * @param {FormBuilder} _formBuilder
     * @param _authService
     * @param _usuarioService
     * @param _tituloService
     * @param _detalleService
     * @param _httpClient
     */
    constructor(
        private _formBuilder: FormBuilder,
        private readonly _usuarioService: UsuarioService,
        private readonly _httpClient: HttpClient,
    ) {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    rutaImagen = environment.url + '/public/users';

    /**
     * On init
     */
    ngOnInit(): void {
        this.usuarioFuncion();

        this.horizontalStepperStep0 = this._formBuilder.group({
            imagenUsuario: [''],
        });
        // Horizontal Stepper form steps
        this.horizontalStepperStep1 = this._formBuilder.group({

            nombres: ['', Validators.required],
            apellidos: ['', Validators.required],
            identificacion: ['', Validators.required],
            fecha_nacimiento: ['', Validators.required],
            direccion: ['', Validators.required],
        });

        this.horizontalStepperStep2 = this._formBuilder.group({});

        this.horizontalStepperStep3 = this._formBuilder.group({
            telefono: [''],
            email: ['', Validators.required],
        });


        this.horizontalStepperStep6 = this._formBuilder.group({
            nick: [''],
            password: [''],
            unidad_educativa :[''],
        });
    }

    finishHorizontalStepper(): void {
        console.log(this.horizontalStepperStep1.value.nombres);
        this.updateUserData();
    }

    usuarioFuncion(): void {
        let aux: any;
        if (localStorage.getItem('rol') === 'PROFESOR') {
            this._httpClient.get(environment.url + '/usuario/' + localStorage.getItem('nick'), {headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('tokenUsuario')})}).subscribe(res => {
                console.log(res);
                aux = res;
                this.imgURL = this.rutaImagen + aux.nombreFoto;
                this.identificacion_usuario = aux.cedula;
                this.horizontalStepperStep0 = this._formBuilder.group({
                    imagenUsuario: [aux.nombreFoto],
                });
                this.horizontalStepperStep1 = this._formBuilder.group({
                    nombres: [aux.nombre],
                    apellidos: [aux.apellido],
                    identificacion: [aux.cedula],
                    fecha_nacimiento: [aux.fecha_nacimiento],
                    direccion: [aux.direccion],
                });

                this.horizontalStepperStep2 = this._formBuilder.group({});

                this.horizontalStepperStep3 = this._formBuilder.group({
                    telefono: [aux.telefono],
                    email: [aux.email],
                });
                this.horizontalStepperStep6 = this._formBuilder.group({
                    nick: [aux.nick],
                    password: [aux.password],
                    unidad_educativa:[aux.unidad_educativa],

                });


            });
        }


        if (localStorage.getItem('rol') === 'ESTUDIANTE') {
            this._httpClient.get(environment.url + '/estudiante/' + localStorage.getItem('nick'), {headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('tokenUsuario')})}).subscribe(res => {
                console.log(res);
                aux = res;
                this.imgURL = this.rutaImagen + aux.nombreFoto;
                this.identificacion_usuario = aux.cedula;
                this.horizontalStepperStep0 = this._formBuilder.group({
                    imagenUsuario: [aux.nombreFoto],
                });
                this.horizontalStepperStep1 = this._formBuilder.group({
                    nombres: [aux.nombre],
                    apellidos: [aux.apellido],
                    identificacion: [aux.cedula],
                    fecha_nacimiento: [aux.fecha_nacimiento],
                    direccion: [aux.direccion],
                });

                this.horizontalStepperStep2 = this._formBuilder.group({});

                this.horizontalStepperStep3 = this._formBuilder.group({
                    telefono: [aux.telefono],
                    email: [aux.email],
                });
                this.horizontalStepperStep6 = this._formBuilder.group({
                    nick: [aux.nick],
                    password: [aux.password],
                    unidad_educativa:[aux.unidad_educativa],

                });


            });
        }


    }


    async updateUserData() {
        if (localStorage.getItem('rol') === 'PROFESOR') {
            const res = await this._httpClient.put(environment.url + '/usuario/' + localStorage.getItem('idProfesorRegistrado'), {
                nombre: this.horizontalStepperStep1.value.nombres,
                apellido: this.horizontalStepperStep1.value.apellidos,
                cedula: this.horizontalStepperStep1.value.identificacion,
                fecha_nacimiento: new Date(this.horizontalStepperStep1.value.fecha_nacimiento),
                //direccion: this.horizontalStepperStep1.value.direccion,
                unidad_educativa: this.horizontalStepperStep6.value.unidad_educativa,
                email: this.horizontalStepperStep3.value.email,
                // telefono: this.horizontalStepperStep3.value.telefono,
                //nivel_estu_usuario: this.horizontalStepperStep4.value.formacion,
                nombreFoto: this.imagenSelecionada,
                nick: this.horizontalStepperStep6.value.nick,
                password: this.horizontalStepperStep6.value.password,
                //sexo_usuario: userUpdate.sex,
                telefono: this.horizontalStepperStep3.value.telefono.toString()
            }, {}).subscribe(res => {
                Swal.fire({
                    icon: 'success',
                    text: 'Los datos fueron modificados con éxito',
                });
            });
        }

        if (localStorage.getItem('rol') === 'ESTUDIANTE') {
            const res = await this._httpClient.put(environment.url + '/estudiante/' + localStorage.getItem('idEstudianteRegistrado'), {
                nombre: this.horizontalStepperStep1.value.nombres,
                apellido: this.horizontalStepperStep1.value.apellidos,
                cedula: this.horizontalStepperStep1.value.identificacion,
                fecha_nacimiento: new Date(this.horizontalStepperStep1.value.fecha_nacimiento),
                //direccion: this.horizontalStepperStep1.value.direccion,
                unidad_educativa: this.horizontalStepperStep6.value.unidad_educativa,
                email: this.horizontalStepperStep3.value.email,
                // telefono: this.horizontalStepperStep3.value.telefono,
                //nivel_estu_usuario: this.horizontalStepperStep4.value.formacion,
                nombreFoto: this.imagenSelecionada,
                nick: this.horizontalStepperStep6.value.nick,
                password: this.horizontalStepperStep6.value.password,
                //sexo_usuario: userUpdate.sex,
                telefono: this.horizontalStepperStep3.value.telefono.toString()
            }, {}).subscribe(res => {
                Swal.fire({
                    icon: 'success',
                    text: 'Los datos fueron modificados con éxito',
                });
            });
        }
    }


    onFileChangeFoto(event): void {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            this.imagenUsuario = file;
            this.onSubmitFoto();
        }
    }

    onSubmitFoto(): void {
        this._usuarioService.uploadFile(this.imagenUsuario).subscribe(value => {
            this.path = value.imagePath;
            this.imagenSelecionada = this.path;
            Swal.fire({
                icon: 'success',
                text: 'Tu imagen se guardó con éxito!',
            });
        }, error => {
            if (error.status && error.status === 403) {

            } else {
                // alert('No se puede cargar la imagen prueba cambiando el formato a .png');
            }
            console.log(error, 'error');
        });
    }

    preview(files): void {
        if (files.length === 0) {
            return;
        }

        const mimeType = files[0].type;
        if (mimeType.match(/image\/*/) == null) {
            this.message = 'Only images are supported.';
            return;
        }

        const reader = new FileReader();
        this.imagePath = files;
        reader.readAsDataURL(files[0]);
        reader.onload = (_event) => {
            this.imgURL = reader.result;
        };
    }

}
