import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule } from '@fuse/components';
import {MatCardModule} from "@angular/material/card";
import {VideosComponent} from "./videos.component";

const routes = [
    {
        path     : 'videos',
        component: VideosComponent,
    },

    {
        path      : '**',
        redirectTo: 'videos'
    }
];

@NgModule({
    declarations: [
        VideosComponent,
    ],
    imports: [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,

        FuseSharedModule,
        FuseSidebarModule,
        MatCardModule
    ],

})
export class VideosModule
{
}
