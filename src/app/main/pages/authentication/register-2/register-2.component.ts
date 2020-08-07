import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {FuseConfigService} from '@fuse/services/config.service';
import {fuseAnimations} from '@fuse/animations';
import Swal from "sweetalert2";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";
import {Router} from "@angular/router";

@Component({
    selector: 'register-2',
    templateUrl: './register-2.component.html',
    styleUrls: ['./register-2.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class Register2Component implements OnInit, OnDestroy {
    registerForm: FormGroup;

    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private http: HttpClient,
        public router: Router
    ) {
        // Configure the layout
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

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
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
        this.registerForm = this._formBuilder.group({
            nombre: ['', Validators.required],
            apellido: ['', Validators.required],
            cedula: ['', Validators.required],
            unidad_educativa: ['', Validators.required],
            amie: ['', Validators.required],
            fecha_nacimiento: ['', Validators.required],
            telefono: ['', Validators.required],
            grado: ['', Validators.required],
            nick: ['', Validators.required],
            correo: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            passwordConfirm: ['', [Validators.required, confirmPasswordValidator]]
        });

        // Update the validity of the 'passwordConfirm' field
        // when the 'password' field changes
        this.registerForm.get('password').valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this.registerForm.get('passwordConfirm').updateValueAndValidity();
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    ingresarUsuario() {
        this.http.post(environment.url + '/usuario',
            {
                nombre: this.registerForm.value.nombre,
                apellido: this.registerForm.value.apellido,
                email: this.registerForm.value.correo,
                nick: this.registerForm.value.nick,
                password: this.registerForm.value.password,
                cedula: this.registerForm.value.cedula,
                fecha_nacimiento: this.registerForm.value.fecha_nacimiento,
                grado: this.registerForm.value.grado.toString(),
                telefono: this.registerForm.value.telefono,
                unidad_educativa: this.registerForm.value.unidad_educativa,
                //nombreFoto: this.path,
                amie: this.registerForm.value.amie,
                rol: 'Prof',
            }).subscribe(data => {
            this.registrocorrecto()
            const rutaHomeUsuario = [
                '/*',
            ];
            this.router.navigate(rutaHomeUsuario);
            this.ngOnInit();
        })

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
            text: 'No se ingresó el usuario',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        })
    }


}

/**
 * Confirm password validator
 *
 * @param {AbstractControl} control
 * @returns {ValidationErrors | null}
 */
export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

    if (!control.parent || !control) {
        return null;
    }

    const password = control.parent.get('password');
    const passwordConfirm = control.parent.get('passwordConfirm');

    if (!password || !passwordConfirm) {
        return null;
    }

    if (passwordConfirm.value === '') {
        return null;
    }

    if (password.value === passwordConfirm.value) {
        return null;
    }

    return {passwordsNotMatching: true};
};
