import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseConfirmDialogModule, FuseSidebarModule } from '@fuse/components';

import {DislexiaPruebaComponent} from "./dislexia-prueba.component";
import {DislexiaTestComponent} from "./dislexia-test/dislexia-test.component";
import {VocalComponent} from "./juegos/vocal/vocal.component";
import {Juego2Component} from "./juegos/juego2/juego2.component";
import {CajaComponent} from "./juegos/caja/caja.component";
import {DislexiaVisualComponent} from "./dislexia-visual/dislexia-visual.component";
const routes: Routes = [
    {
        path     : 'fonologica',
        component: DislexiaTestComponent,
    },
    {
        path     : 'visual',
        component: DislexiaVisualComponent,
    },
    {
        path     : '**',
        component: DislexiaPruebaComponent,
    }
];

@NgModule({
    declarations   : [
        DislexiaPruebaComponent,
        DislexiaTestComponent,
        CajaComponent,
        Juego2Component,
        VocalComponent,
        DislexiaVisualComponent
    ],
    imports        : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatRippleModule,
        MatTableModule,
        MatToolbarModule,

        FuseSharedModule,
        FuseConfirmDialogModule,
        FuseSidebarModule
    ],})
export class PrediagnosticoModule
{
}
