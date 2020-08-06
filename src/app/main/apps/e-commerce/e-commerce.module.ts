import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AgmCoreModule } from '@agm/core';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';

import { EcommerceProductsComponent } from 'app/main/apps/e-commerce/lista_estudiantes/products.component';
import { EcommerceProductsService } from 'app/main/apps/e-commerce/lista_estudiantes/products.service';
import { EcommerceProductComponent } from 'app/main/apps/e-commerce/product/product.component';
import { EcommerceProductService } from 'app/main/apps/e-commerce/product/product.service';
import { EcommerceOrdersComponent } from 'app/main/apps/e-commerce/orders/orders.component';
import { EcommerceOrdersService } from 'app/main/apps/e-commerce/orders/orders.service';
import { EcommerceOrderComponent } from 'app/main/apps/e-commerce/order/order.component';
import { EcommerceOrderService } from 'app/main/apps/e-commerce/order/order.service';
import {InformacionEstudianteService} from "../../servicios/informacion-estudiante.service";
import { CalificacionesComponent } from './calificaciones/calificaciones.component';
import {CalificacionesService} from "./calificaciones/calificaciones.service";
import { CalificacionesnewComponent } from './calificacionesnew/calificacionesnew.component';
import {CalificacionesnewService} from "./calificacionesnew/calificacionesnew.service";
import { UsuarioPuntajeComponent } from './usuario-puntaje/usuario-puntaje.component';
import { TestDiagnosticoComponent } from './test-diagnostico/test-diagnostico.component';
import { GraficasComponent } from './graficas/graficas.component';
import {UsuarioPuntajeService} from "./usuario-puntaje/usuario-puntaje.service";
import {TestDiagnosticoService} from "./test-diagnostico/test-diagnostico.service";

import {HighchartsChartModule} from "highcharts-angular";

const routes: Routes = [
    {
        path     : 'estudiante',
        component: EcommerceProductsComponent,
        resolve  : {
            data: EcommerceProductsService
        }
    },
    {
        path     : 'estudiante/:id',
        component: EcommerceProductComponent,
        resolve  : {
            data: EcommerceProductService
        }
    },
    {
        path     : 'estudiante/:id/:handle',
        component: EcommerceProductComponent,
        resolve  : {
            data: EcommerceProductService
        }
    },
    {
        path     : 'estudiante/calificaciones/:id/:handle',
        component: CalificacionesComponent,
        resolve  : {
            data: CalificacionesService
        }
    },

    {
        path     : 'calificacion',
        component: CalificacionesComponent,
        resolve  : {
            data: CalificacionesService
        }
    },
    {
        path     : 'estudiante/calificaciones/:id/:handle/new',
        component: CalificacionesnewComponent,
        resolve  : {
            data: CalificacionesnewService
        }
    },
    {
        path     : 'orders',
        component: EcommerceOrdersComponent,
        resolve  : {
            data: EcommerceOrdersService
        }
    },
    {
        path     : 'graficas/:id/:handle',
        component: GraficasComponent,
        resolve  : {
            data: EcommerceOrdersService
        }
    },
    {
        path     : 'puntaje',
        component: UsuarioPuntajeComponent,
        resolve  : {
            data: UsuarioPuntajeService,
        }
    },
    {
        path     : 'puntaje/:id/:handle',
        component: TestDiagnosticoComponent,
        resolve  : {
            data: TestDiagnosticoService
        }
    },
    {
        path     : 'orders/:id',
        component: EcommerceOrderComponent,
        resolve  : {
            data: EcommerceOrderService
        }
    }
];

@NgModule({
    declarations: [
        EcommerceProductsComponent,
        EcommerceProductComponent,
        EcommerceOrdersComponent,
        EcommerceOrderComponent,
        CalificacionesComponent,
        CalificacionesnewComponent,
        UsuarioPuntajeComponent,
        TestDiagnosticoComponent,
        GraficasComponent,
    ],
    imports     : [
        RouterModule.forChild(routes),
        HighchartsChartModule,
        MatButtonModule,
        MatChipsModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatPaginatorModule,
        MatRippleModule,
        MatSelectModule,
        MatSortModule,
        MatSnackBarModule,
        MatTableModule,
        MatTabsModule,

        NgxChartsModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyD81ecsCj4yYpcXSLFcYU97PvRsE_X8Bx8'
        }),

        FuseSharedModule,
        FuseWidgetModule
    ],
    providers   : [
        EcommerceProductsService,
        EcommerceProductService,
        EcommerceOrdersService,
        EcommerceOrderService,
        InformacionEstudianteService,
        CalificacionesService,
        CalificacionesnewService,
        UsuarioPuntajeService,
        TestDiagnosticoService
    ]
})
export class EcommerceModule
{
}
