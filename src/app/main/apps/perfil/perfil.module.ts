import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';

import { FuseSharedModule } from '@fuse/shared.module';

import {PerfilComponent} from './perfil.component';
import { CambiarContrasenaComponent } from './cambiar-contrasena/cambiar-contrasena.component';

const routes: Routes = [
    {
        path     : '',
        component: PerfilComponent
    },
    {
        path     : 'change-password',
        component: CambiarContrasenaComponent
    },

];

@NgModule({
    declarations: [
        PerfilComponent,
        CambiarContrasenaComponent,
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatStepperModule,

        FuseSharedModule,
    ],
    providers:[]
})
export class PerfilModule
{
}
