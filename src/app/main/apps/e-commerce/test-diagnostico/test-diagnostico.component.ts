import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, fromEvent, merge, Observable, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';

import {fuseAnimations} from '@fuse/animations';
import {FuseUtils} from '@fuse/utils';

import {EcommerceProductsService} from 'app/main/apps/e-commerce/lista_estudiantes/products.service';
import {takeUntil} from 'rxjs/internal/operators';
import {environment} from "../../../../../environments/environment";
import {ActivatedRoute} from "@angular/router";
import {UsuarioService} from "../../../servicios/usuario.service";
import {TestDiagnosticoService} from "./test-diagnostico.service";

@Component({
    selector: 'app-test-diagnostico',
    templateUrl: './test-diagnostico.component.html',
    styleUrls: ['./test-diagnostico.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class TestDiagnosticoComponent implements OnInit {

    urlImagen = environment.url + '/public/users/';
    dataSource: FilesDataSource | null;
    displayedColumns = ['id', 'name', 'category', 'fecha'];

    @ViewChild(MatPaginator, {static: true})
    paginator: MatPaginator;

    @ViewChild(MatSort, {static: true})
    sort: MatSort;

    @ViewChild('filter', {static: true})
    filter: ElementRef;

    // Private
    private _unsubscribeAll: Subject<any>;
    usuario: any;
    idEstudiante: any;

    constructor(
        private _ecommerceProductsService: TestDiagnosticoService,
        private route: ActivatedRoute,
        private listaEstudiantes: UsuarioService,
    ) {
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
        this.idEstudiante = this.route.snapshot.params.id
        this.consultarUsuario()
        this.getPuntajeVariables()
        this.dataSource = new FilesDataSource(this._ecommerceProductsService, this.paginator, this.sort);

        fromEvent(this.filter.nativeElement, 'keyup')
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if (!this.dataSource) {
                    return;
                }

                this.dataSource.filter = this.filter.nativeElement.value;
            });
    }

    consultarUsuario() {
        this.listaEstudiantes.getEstudianteId(this.route.snapshot.params.id).then(data => {
            console.log(data)
            this.usuario = data;
            environment.nombreUsuario= this.usuario.nombre + ' '+ this.usuario.apellido
            environment.fotoUsuario = environment.url+'/public/users/'+this.usuario.fotoUsuario
        });
    }

    getPuntajeVariables(): void {
        let auxPuntaje: any;
        this.listaEstudiantes.getEstudianteId(this.route.snapshot.params.id).then(data => {
            console.log(data)
            this.usuario = data;
            auxPuntaje = this.usuario.puntaje
            console.log(auxPuntaje);
            for (let i = 0; i < auxPuntaje.length; i++) {
                console.log(auxPuntaje[i]);
                if (auxPuntaje[i].detalle === 'Dislexia Fonológica') {
                    console.log('ok')
                    environment.dislexiaFonologica.push(parseInt(auxPuntaje[i].puntaje))
                }
                if (auxPuntaje[i].detalle === 'Dislexia Visual') {
                    environment.dislexiaVisual.push(parseInt(auxPuntaje[i].puntaje))
                }

            }
            console.log(environment.dislexiaVisual)

        })
    }
}

export class FilesDataSource extends DataSource<any> {
    private _filterChange = new BehaviorSubject('');
    private _filteredDataChange = new BehaviorSubject('');

    /**
     * Constructor
     *
     * @param {EcommerceProductsService} _ecommerceProductsService
     * @param {MatPaginator} _matPaginator
     * @param {MatSort} _matSort
     */
    constructor(
        private _ecommerceProductsService: TestDiagnosticoService,
        private _matPaginator: MatPaginator,
        private _matSort: MatSort
    ) {
        super();

        this.filteredData = this._ecommerceProductsService.products;
    }

    /**
     * Connect function called by the table to retrieve one stream containing the data to render.
     *
     * @returns {Observable<any[]>}
     */
    connect(): Observable<any[]> {
        const displayDataChanges = [
            this._ecommerceProductsService.onProductsChanged,
            this._matPaginator.page,
            this._filterChange,
            this._matSort.sortChange
        ];

        return merge(...displayDataChanges)
            .pipe(
                map(() => {
                        let data = this._ecommerceProductsService.products.slice();

                        data = this.filterData(data);

                        this.filteredData = [...data];

                        data = this.sortData(data);

                        // Grab the page's slice of data.
                        const startIndex = this._matPaginator.pageIndex * this._matPaginator.pageSize;
                        return data.splice(startIndex, this._matPaginator.pageSize);
                    }
                ));
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    // Filtered data
    get filteredData(): any {
        return this._filteredDataChange.value;
    }

    set filteredData(value: any) {
        this._filteredDataChange.next(value);
    }

    // Filter
    get filter(): string {
        return this._filterChange.value;
    }

    set filter(filter: string) {
        this._filterChange.next(filter);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Filter data
     *
     * @param data
     * @returns {any}
     */
    filterData(data): any {
        if (!this.filter) {
            return data;
        }
        return FuseUtils.filterArrayByString(data, this.filter);
    }

    /**
     * Sort data
     *
     * @param data
     * @returns {any[]}
     */
    sortData(data): any[] {
        if (!this._matSort.active || this._matSort.direction === '') {
            return data;
        }

        return data.sort((a, b) => {
            let propertyA: number | string = '';
            let propertyB: number | string = '';

            switch (this._matSort.active) {
                case 'id':
                    [propertyA, propertyB] = [a.id, b.id];
                    break;
                case 'name':
                    [propertyA, propertyB] = [a.name, b.name];
                    break;
                case 'categories':
                    [propertyA, propertyB] = [a.categories[0], b.categories[0]];
                    break;
                case 'price':
                    [propertyA, propertyB] = [a.priceTaxIncl, b.priceTaxIncl];
                    break;
                case 'quantity':
                    [propertyA, propertyB] = [a.quantity, b.quantity];
                    break;
                case 'active':
                    [propertyA, propertyB] = [a.active, b.active];
                    break;
            }

            const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

            return (valueA < valueB ? -1 : 1) * (this._matSort.direction === 'asc' ? 1 : -1);
        });
    }

    /**
     * Disconnect
     */
    disconnect(): void {
    }
}
