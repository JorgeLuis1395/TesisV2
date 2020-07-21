import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxDnDModule } from '@swimlane/ngx-dnd';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseConfirmDialogModule, FuseMaterialColorPickerModule } from '@fuse/components';
import { ScrumboardComponent } from 'app/main/apps/welcome/scrumboard.component';

const routes: Routes = [
    {
        path     : 'welcome',
        component: ScrumboardComponent,
    },
    {
        path      : '**',
        redirectTo: 'welcome'
    }
];

@NgModule({
    declarations   : [
        ScrumboardComponent,
    ],
    imports        : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatCheckboxModule,
        MatChipsModule,
        MatDatepickerModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatProgressBarModule,
        MatRippleModule,
        MatSidenavModule,
        MatToolbarModule,
        MatTooltipModule,

        NgxDnDModule,

        FuseSharedModule,
        FuseConfirmDialogModule,
        FuseMaterialColorPickerModule
    ],
    providers      : [
    ],
    entryComponents: []
})
export class ScrumboardModule
{
}
