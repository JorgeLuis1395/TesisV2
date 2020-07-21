import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseDemoModule } from '@fuse/components/demo/demo.module';

import { CardedFullWidth1Component } from 'app/main/ui/page-layouts/carded/info1/full-width-1.component';
import { CardedFullWidth2Component } from 'app/main/ui/page-layouts/carded/dislexia4/full-width-2.component';
import { CardedFullWidthTabbed2Component } from 'app/main/ui/page-layouts/carded/7-pasos-dislexi/full-width-tabbed-2.component';
import { SimpleFullWidth1Component } from 'app/main/ui/page-layouts/simple/full-width-1/full-width-1.component';
import { SimpleFullWidthTabbed1Component } from 'app/main/ui/page-layouts/simple/full-width-tabbed-1/full-width-tabbed-1.component';
import { SimpleLeftSidebar1Component } from 'app/main/ui/page-layouts/simple/left-sidebar-1/left-sidebar-1.component';
import { SimpleLeftSidebar2Component } from 'app/main/ui/page-layouts/simple/left-sidebar-2/left-sidebar-2.component';
import { SimpleLeftSidebar3Component } from 'app/main/ui/page-layouts/simple/left-sidebar-3/left-sidebar-3.component';
import { SimpleLeftSidebar4Component } from 'app/main/ui/page-layouts/simple/left-sidebar-4/left-sidebar-4.component';
import { SimpleRightSidebar1Component } from 'app/main/ui/page-layouts/simple/right-sidebar-1/right-sidebar-1.component';
import { SimpleRightSidebar2Component } from 'app/main/ui/page-layouts/simple/right-sidebar-2/right-sidebar-2.component';
import { SimpleRightSidebar3Component } from 'app/main/ui/page-layouts/simple/right-sidebar-3/right-sidebar-3.component';
import { SimpleRightSidebar4Component } from 'app/main/ui/page-layouts/simple/right-sidebar-4/right-sidebar-4.component';
import { BlankComponent } from 'app/main/ui/page-layouts/blank/blank.component';

import { FuseSidebarModule } from '@fuse/components';
import { Dislexia2Component } from './carded/dislexia2/dislexia2.component';
import { Dislexia3Component } from './carded/dislexia3/dislexia3.component';

const routes: Routes = [
    // Carded
    {
        path     : 'page-layouts/dislexia1',
        component: CardedFullWidth1Component
    },
    {
        path     : 'page-layouts/dislexia4',
        component: CardedFullWidth2Component
    },
    {
        path     : 'page-layouts/dislexia5',
        component: CardedFullWidthTabbed2Component
    },
    // Simple
    {
        path     : 'page-layouts/simple/dislexia1',
        component: SimpleFullWidth1Component
    },
    {
        path     : 'page-layouts/simple/full-width-tabbed-1',
        component: SimpleFullWidthTabbed1Component
    },

    {
        path     : 'page-layouts/dislexia2',
        component: Dislexia2Component
    },
    {
        path     : 'page-layouts/dislexia3',
        component: Dislexia3Component
    },
    // Blank
    {
        path     : 'page-layouts/blank',
        component: BlankComponent
    }
];

@NgModule({
    declarations: [
        CardedFullWidth1Component,
        CardedFullWidth2Component,
        CardedFullWidthTabbed2Component,
        SimpleFullWidth1Component,
        SimpleFullWidthTabbed1Component,
        SimpleLeftSidebar1Component,
        SimpleLeftSidebar2Component,
        SimpleLeftSidebar3Component,
        SimpleLeftSidebar4Component,
        SimpleRightSidebar1Component,
        SimpleRightSidebar2Component,
        SimpleRightSidebar3Component,
        SimpleRightSidebar4Component,
        BlankComponent,
        Dislexia2Component,
        Dislexia3Component
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatIconModule,
        MatTabsModule,

        FuseSidebarModule,
        FuseSharedModule,
        FuseDemoModule
    ]
})
export class UIPageLayoutsModule
{
}
