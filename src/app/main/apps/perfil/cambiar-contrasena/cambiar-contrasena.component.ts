import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {environment} from "../../../../../environments/environment";
import Swal from "sweetalert2";
import {fuseAnimations} from "../../../../../@fuse/animations";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FuseConfigService} from "../../../../../@fuse/services/config.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-cambiar-contrasena',
    templateUrl: './cambiar-contrasena.component.html',
    styleUrls: ['./cambiar-contrasena.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class CambiarContrasenaComponent implements OnInit {
    resetPasswordForm: FormGroup;


    constructor(private _httpClient: HttpClient, private _fuseConfigService: FuseConfigService,
                private _formBuilder: FormBuilder,
                private readonly router: Router,) {

    }

    ngOnInit(): void {
        this.resetPasswordForm = this._formBuilder.group({
            old_password: ['', [Validators.required]],
            password: ['', Validators.required],
            passwordConfirm: ['', [Validators.required]]
        });

    }

    async updateUserData() {
        if (localStorage.getItem('rol') === 'PROFESOR') {
            const res = await this._httpClient.put(environment.url + '/usuario/' + localStorage.getItem('idProfesorRegistrado'), {
                password: this.resetPasswordForm.value.password,
            }, {headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('tokenUsuario')})}).subscribe(res => {
                Swal.fire({
                    icon: 'success',
                    text: 'Los datos fueron modificados con éxito',
                });
            });
        }

        if (localStorage.getItem('rol') === 'ESTUDIANTE') {
            const res = await this._httpClient.put(environment.url + '/estudiante/' + localStorage.getItem('idEstudianteRegistrado'), {

                password: this.resetPasswordForm.value.password,

            }, {headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('tokenUsuario')})}).subscribe(res => {
                Swal.fire({
                    icon: 'success',
                    text: 'Los datos fueron modificados con éxito',
                });
            });
        }
    }

}
