import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Product} from "../product/product.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {environment} from "../../../../../environments/environment";
import {Subject} from "rxjs";
import {EcommerceProductService} from "../product/product.service";
import {Location} from "@angular/common";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UsuarioService} from "../../../servicios/usuario.service";
import {takeUntil} from "rxjs/operators";
import Swal from "sweetalert2";
import {ActivatedRoute} from "@angular/router";
import {CalificacionesService} from "../calificaciones/calificaciones.service";
import {CalificacionesnewService} from "./calificacionesnew.service";
import {Calificacion} from "./calificacionesnew.model";
import {fuseAnimations} from "../../../../../@fuse/animations";

@Component({
    selector: 'app-calificacionesnew',
    templateUrl: './calificacionesnew.component.html',
    styleUrls: ['./calificacionesnew.component.scss'],

    animations   : fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class CalificacionesnewComponent implements OnInit {

    product: Calificacion;
    usuario: any;
    idEstudiante: any;
    pageType: string;
    productForm: FormGroup;
    urlImagen = environment.url + '/public/users/';
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
     * @param route
     * @param listaEstudiantes
     */
    constructor(
        private _ecommerceProductService: CalificacionesnewService,
        private _formBuilder: FormBuilder,
        private _location: Location,
        private _matSnackBar: MatSnackBar,
        private _usuarioService: UsuarioService,
        private route: ActivatedRoute,
        private listaEstudiantes: UsuarioService,
    ) {
        // Set the default
        this.product = new Calificacion();

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
        this.consultarUsuario()
        this._ecommerceProductService.onProductChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(product => {

                if (product) {
                    this.product = new Calificacion(product);
                    this.pageType = 'edit';
                } else {
                    this.pageType = 'new';
                    this.product = new Calificacion();
                }

                this.productForm = this.createProductForm();
            });
    }

    consultarUsuario() {
        this.listaEstudiantes.getEstudianteId(this.route.snapshot.params.id).then(data => {
            console.log(data)
            this.usuario = data;
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
    tipoAux: string;

    /**
     * Create product form
     *
     * @returns {FormGroup}
     */
    createProductForm(): FormGroup {
        return this._formBuilder.group({
            tipo: [this.product.tipo],
            detalle: [this.product.detalle],
            materia: [this.product.materia],
            calificacion: [this.product.calificacion],

        });
    }

    addProduct(): void {
        const data = this.productForm.getRawValue();

        this._ecommerceProductService.addProduct(data)
            .then(() => {

                // Trigger the subscription with new data
                this._ecommerceProductService.onProductChanged.next(data);

                // Show the success message
                this._matSnackBar.open('Estudiante añadido correctamente', 'OK', {
                    verticalPosition: 'top',
                    duration: 2000
                });

            });
    }

}

