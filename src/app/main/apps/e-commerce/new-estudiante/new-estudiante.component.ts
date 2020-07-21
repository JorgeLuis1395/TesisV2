import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import Swal from "sweetalert2";
import {InformacionEstudianteService} from "../../../servicios/informacion-estudiante.service";
import {environment} from "../../../../../environments/environment";
import {ValidacionesService} from "../../../servicios/validaciones.service";
@Component({
  selector: 'app-new-estudiante',
  templateUrl: './new-estudiante.component.html',
  styleUrls: ['./new-estudiante.component.scss']
})
export class NewEstudianteComponent implements OnInit {

    constructor(public _estudiante: InformacionEstudianteService, public http: HttpClient,
                public _validacionService: ValidacionesService,  private formBuilder: FormBuilder, public router: Router) {
        this.usuarioForm = this.formBuilder.group({
            nomUsu: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
            ape: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
            ced: ['', [Validators.required, this._validacionService.cedula]],
            grado: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(2)]],
            fecNac: ['', [Validators.required, this._validacionService.fechaNacimiento]],
            numCon: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(15)]],
            ema: ['', [Validators.required, Validators.email, Validators.minLength(10), Validators.maxLength(50)]],
            nic: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
            pas: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(256)]],
            pas2: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(256)]],
            uniedu: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],

        });
    }
    usuario: any;
    public imagePath;
    imgURL: any;
    public message: string;
    imagenEstudiante: File;

    nombre = '';
    apellido = '';
    email = '';
    nick = '';
    password = '';
    cedula = '';
    fecha_nacimiento = '';
    grado = '';
    telefono = '';
    unidad_educativa = '';
    nombreFoto = '';
    rol = 'Prof';
    usuarioForm: FormGroup;
    password2: string;
    path: string;

    idEstudiante: number;
    aux: any;
    codigo_estudiante: any;



    ngOnInit() {
    }

    onFileChange(event) {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            this.imagenEstudiante = file;
            this.onSubmit();
        }
    }

    onSubmit() {

        this._estudiante.uploadFile(this.imagenEstudiante).subscribe(value => {
            this.path = value.imagePath;
            alert("Imagen Guardada con Exito");

        })


    }

    preview(files) {
        if (files.length === 0)
            return;

        var mimeType = files[0].type;
        if (mimeType.match(/image\/*/) == null) {
            this.message = "Only images are supported.";
            return;
        }

        var reader = new FileReader();
        this.imagePath = files;
        reader.readAsDataURL(files[0]);
        reader.onload = (_event) => {
            this.imgURL = reader.result;
        }
    }

    saveEtudiante() {
        this.nombreFoto = this.path;
        this._estudiante.saveEstudiante(this.nombre,
            this.apellido,
            this.email,
            this.nick,
            this.password,
            this.cedula,
            this.codigo_estudiante,
            this.fecha_nacimiento,
            this.grado,
            this.telefono,
            this.unidad_educativa,
            this.nombreFoto,
            this.rol).then((result) => {
            result
            this.aux = Object.values(result)[1][0];
            this.idEstudiante = parseInt(Object.values(this.aux)[0].toString());
            this.profesorEstudiante();
            this.registrocorrecto();
        }, (err) => {
            this.registroIncorrecto()
        });
    }

    profesorEstudiante() {
        this._estudiante.saveProfesorEstudiante(environment.profesor.idProfesor,
            this.idEstudiante,
        ).then((result) => {
            result
            alert("Estudiante Registrado Satisfactoriamente");
        }, (err) => {
            alert("No se pudo registrar el Estudiante");
        });
    }

    generarCodigo() {
        var caracteres = "abcdefghijkmnpqrtuvwxyzABCDEFGHJKMNPQRTUVWXYZ12346789";
        var contraseña = "";
        for (var i = 0; i < 10; i++) contraseña += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
        this.codigo_estudiante = contraseña;
    }

    registrocorrecto() {
        Swal.fire({
            title: 'Correcto!',
            text: 'Se ingresó de manera correcta el usuario',
            icon: 'success',
            confirmButtonText: 'Aceptar'
        })
    }

    registroIncorrecto() {
        Swal.fire({
            title: 'Error!',
            text: 'No se ingresó el usuario, carga una imagen o verifica tus contraseñas',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        })
    }
}
