import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Location} from '@angular/common';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {fuseAnimations} from '@fuse/animations';
import {FuseUtils} from '@fuse/utils';

import {Product} from 'app/main/apps/e-commerce/product/product.model';
import {EcommerceProductService} from 'app/main/apps/e-commerce/product/product.service';
import {environment} from "../../../../../environments/environment";
import Swal from "sweetalert2";
import {UsuarioService} from "../../../servicios/usuario.service";

@Component({
    selector: 'e-commerce-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class EcommerceProductComponent implements OnInit, OnDestroy {
    product: Product;
    pageType: string;
    productForm: FormGroup;
    rutaImagen = environment.url + '/public/users/'
    // Private
    private _unsubscribeAll: Subject<any>;
    codigo_estudiante = '';

    public imagePath;
    path: string;
    imgURL: any;
    imagenUsuario: File;
    public message: string;
    imagenSelecionada: string;


    /**
     * Constructor
     *
     * @param {EcommerceProductService} _ecommerceProductService
     * @param {FormBuilder} _formBuilder
     * @param {Location} _location
     * @param {MatSnackBar} _matSnackBar
     * @param _usuarioService
     */
    constructor(
        private _ecommerceProductService: EcommerceProductService,
        private _formBuilder: FormBuilder,
        private _location: Location,
        private _matSnackBar: MatSnackBar,
        private _usuarioService: UsuarioService,
    ) {
        // Set the default
        this.product = new Product();

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
        this.imgURL = this.rutaImagen + this.product.nombreFoto
        this.codigo_estudiante = this.product.codigo_estudiante
        // Subscribe to update product on changes
        this._ecommerceProductService.onProductChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(product => {

                if (product) {
                    this.product = new Product(product);
                    this.pageType = 'edit';
                } else {
                    this.pageType = 'new';
                    this.product = new Product();
                }

                this.productForm = this.createProductForm();
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

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create product form
     *
     * @returns {FormGroup}
     */
    createProductForm(): FormGroup {
        return this._formBuilder.group({

            nombre: [this.product.nombre],
            apellido: [this.product.apellido],
            email: [this.product.email],
            nick: [this.product.nick],
            password: [this.product.password],
            cedula: [this.product.cedula],
            codigo_estudiante: [this.product.codigo_estudiante] || this.codigo_estudiante,
            fecha_nacimiento: [this.product.fecha_nacimiento],
            grado: [this.product.grado],
            telefono: [this.product.telefono],
            unidad_educativa: [this.product.unidad_educativa],
            nombreFoto: [this.product.nombreFoto],
            rol: [this.product.rol]
        });
    }

    /**
     * Save product
     */
    saveProduct(): void {
        const data = this.productForm.getRawValue();
        data.nombreFoto = this.imagenSelecionada;
        data.codigo_estudiante = this.codigo_estudiante
            this._ecommerceProductService.saveProduct(data, this.imagenSelecionada)
                .then(() => {

                    // Trigger the subscription with new data
                    this._ecommerceProductService.onProductChanged.next(data);

                    // Show the success message
                    this._matSnackBar.open('Datos Guardados', 'OK', {
                        verticalPosition: 'top',
                        duration: 2000
                    });
                });
    }

    /**
     * Add product
     */
    addProduct(): void {
        const data = this.productForm.getRawValue();

        this._ecommerceProductService.addProduct(data, this.imagenSelecionada,this.codigo_estudiante)
            .then(() => {

                // Trigger the subscription with new data
                this._ecommerceProductService.onProductChanged.next(data);

                // Show the success message
                this._matSnackBar.open('Estudiante añadido correctamente', 'OK', {
                    verticalPosition: 'top',
                    duration: 2000
                });

                // Change the location with new one
                this._location.go('apps/e-commerce/products/' + this.product.id + '/' + this.product.nombre);
            });
    }

    generarCodigo() {
        var caracteres = "abcdefghijkmnpqrtuvwxyzABCDEFGHJKMNPQRTUVWXYZ12346789";
        var contrasena = "";
        for (var i = 0; i < 10; i++) contrasena += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
        this.codigo_estudiante = contrasena;
        console.log(this.codigo_estudiante)
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
