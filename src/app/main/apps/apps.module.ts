import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';
import {MatIconModule} from "@angular/material/icon";
import { CuentosComponent } from './imagenes/cuentos.component';

const routes = [
    {
        path        : 'mail',
        loadChildren: () => import('./mail/mail.module').then(m => m.MailModule)
    },
    {
        path        : 'mail-ngrx',
        loadChildren: () => import('./mail-ngrx/mail.module').then(m => m.MailNgrxModule)
    },
    {
        path        : 'chat',
        loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule)
    },
    {
        path        : 'calendar',
        loadChildren: () => import('./calendar/calendar.module').then(m => m.CalendarModule)
    },
    {
        path        : 'e-commerce',
        loadChildren: () => import('./e-commerce/e-commerce.module').then(m => m.EcommerceModule)
    },
    {
        path        : 'academy',
        loadChildren: () => import('./academy/academy.module').then(m => m.AcademyModule)
    },
    {
        path        : 'todo',
        loadChildren: () => import('./todo/todo.module').then(m => m.TodoModule)
    },
    {
        path        : 'file-manager',
        loadChildren: () => import('./file-manager/file-manager.module').then(m => m.FileManagerModule)
    },
    {
        path        : 'ahorcado',
        loadChildren: () => import('./ahorcado/contacts.module').then(m => m.ContactsModule)
    },
    {
        path        : 'memoria',
        loadChildren: () => import('./memoria/memoria.module').then(m => m.MemoriaModule)
    },
    {
        path        : 'memoria2',
        loadChildren: () => import('./memoria2/memoria2.module').then(m => m.Memoria2Module)
    },
    {
        path        : 'cuentos',
        loadChildren: () => import('./imagenes/cuentos.module').then(m => m.CuentosModule)
    },
    {
        path        : 'home',
        loadChildren: () => import('./welcome/scrumboard.module').then(m => m.ScrumboardModule)
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        FuseSharedModule,
        MatIconModule
    ],
    declarations: []
})
export class AppsModule
{
}
