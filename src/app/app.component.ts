import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {Platform} from '@angular/cdk/platform';
import {TranslateService} from '@ngx-translate/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {FuseConfigService} from '@fuse/services/config.service';
import {FuseNavigationService} from '@fuse/components/navigation/navigation.service';
import {FuseSidebarService} from '@fuse/components/sidebar/sidebar.service';
import {FuseSplashScreenService} from '@fuse/services/splash-screen.service';
import {FuseTranslationLoaderService} from '@fuse/services/translation-loader.service';

import {navigation} from 'app/navigation/navigation';
import {locale as navigationEnglish} from 'app/navigation/i18n/en';
import {locale as navigationTurkish} from 'app/navigation/i18n/tr';
import {environment} from "../environments/environment";

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    fuseConfig: any;
    navigation: any;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {DOCUMENT} document
     * @param {FuseConfigService} _fuseConfigService
     * @param {FuseNavigationService} _fuseNavigationService
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {FuseSplashScreenService} _fuseSplashScreenService
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     * @param {Platform} _platform
     * @param {TranslateService} _translateService
     */
    constructor(
        @Inject(DOCUMENT) private document: any,
        private _fuseConfigService: FuseConfigService,
        private _fuseNavigationService: FuseNavigationService,
        private _fuseSidebarService: FuseSidebarService,
        private _fuseSplashScreenService: FuseSplashScreenService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _translateService: TranslateService,
        private _platform: Platform
    ) {
        // Get default navigation
        this.navigation = navigation;

        // Register the navigation to the service
        this._fuseNavigationService.register('main', this.navigation);

        // Set the main navigation as our current navigation
        this._fuseNavigationService.setCurrentNavigation('main');

        // Add languages
        this._translateService.addLangs(['en', 'tr']);

        // Set the default language
        this._translateService.setDefaultLang('en');

        // Set the navigation translations
        this._fuseTranslationLoaderService.loadTranslations(navigationEnglish, navigationTurkish);

        // Use a language
        this._translateService.use('en');

        /**
         * ----------------------------------------------------------------------------------------------------
         * ngxTranslate Fix Start
         * ----------------------------------------------------------------------------------------------------
         */

        /**
         * If you are using a language other than the default one, i.e. Turkish in this case,
         * you may encounter an issue where some of the components are not actually being
         * translated when your app first initialized.
         *
         * This is related to ngxTranslate module and below there is a temporary fix while we
         * are moving the multi language implementation over to the Angular's core language
         * service.
         **/

        // Set the default language to 'en' and then back to 'tr'.
        // '.use' cannot be used here as ngxTranslate won't switch to a language that's already
        // been selected and there is no way to force it, so we overcome the issue by switching
        // the default language back and forth.
        /**
         setTimeout(() => {
            this._translateService.setDefaultLang('en');
            this._translateService.setDefaultLang('tr');
         });
         */

        /**
         * ----------------------------------------------------------------------------------------------------
         * ngxTranslate Fix End
         * ----------------------------------------------------------------------------------------------------
         */

        // Add is-mobile class to the body if the platform is mobile
        if (this._platform.ANDROID || this._platform.IOS) {
            this.document.body.classList.add('is-mobile');
        }

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
        this._fuseNavigationService.unregister('admin-nav');
        // Subscribe to config changes
        this._fuseConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((config) => {

                this.fuseConfig = config;
                console.log(this.fuseConfig, this._fuseConfigService)

                if (localStorage.getItem('rol') === 'PROFESOR') {
                    this.registerNewNavigationAndToggleAdmin()
                    this.fuseConfig.colorTheme = 'theme-yellow-light';
                    this.fuseConfig.layout.style = 'horizontal-layout-1';
                    this.fuseConfig.layout.navbar.primaryBackground = 'fuse-navy-50';
                    this.fuseConfig.layout.toolbar.position = 'above';
                    this.fuseConfig.layout.toolbar.hidden = false;
                }
                if (localStorage.getItem('rol') === 'INVITADO') {
                    this.registerNewNavigationAndToggleInvitado()
                    this.fuseConfig.colorTheme = 'theme-blue-gray-dark';
                    this.fuseConfig.layout.style = 'horizontal-layout-1';
                    this.fuseConfig.layout.navbar.primaryBackground = 'fuse-navy-50';
                    this.fuseConfig.layout.toolbar.position = 'below';
                    this.fuseConfig.layout.toolbar.hidden = false;
                    this.fuseConfig.layout.footer.hidden = true;
                }

                if (localStorage.getItem('rol') === 'ESTUDIANTE') {
                    this.registerNewNavigationAndToggleEstudiante()
                    this.fuseConfig.colorTheme = 'theme-pink-dark';
                    this.fuseConfig.layout.style = 'horizontal-layout-1';
                    this.fuseConfig.layout.navbar.primaryBackground = 'fuse-navy-50';
                    this.fuseConfig.layout.toolbar.position = 'above';
                    this.fuseConfig.layout.toolbar.hidden = false;
                }

                // Boxed
                if (this.fuseConfig.layout.width === 'boxed') {
                    this.document.body.classList.add('boxed');
                } else {
                    this.document.body.classList.remove('boxed');
                }

                // Color theme - Use normal for loop for IE11 compatibility
                for (let i = 0; i < this.document.body.classList.length; i++) {
                    const className = this.document.body.classList[i];

                    if (className.startsWith('theme-')) {
                        this.document.body.classList.remove(className);
                    }
                }

                this.document.body.classList.add(this.fuseConfig.colorTheme);
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
     * Toggle sidebar open
     *
     * @param key
     */
    toggleSidebarOpen(key): void {
        this._fuseSidebarService.getSidebar(key).toggleOpen();
    }

    registerNewNavigationAndToggleAdmin(): void {
        const adminNav = [
            {
                id: 'admin',
                title: 'DISLEXIA',
                type: 'group',
                icon: 'apps',
                children: [
                    {
                        id: 'dislexia1',
                        title: 'Que es la Dislexia',
                        type: 'item',
                        icon: 'filter_1',
                        url: '/ui/page-layouts/dislexia1',
                    },
                    {
                        id: 'dislexia2',
                        title: 'PRODISLEX',
                        type: 'item',
                        icon: 'filter_2',
                        url: '/ui/page-layouts/dislexia2'
                    },
                    {
                        id: 'dislexia3',
                        title: 'Adaptaciones generales para alumnos',
                        type: 'item',
                        icon: 'filter_3',
                        url: '/ui/page-layouts/dislexia4'
                    },
                    {
                        id: 'dislexia4',
                        title: 'Adaptaciones generales para exámenes',
                        type: 'item',
                        icon: 'filter_4',
                        url: '/ui/page-layouts/dislexia3'
                    },
                    {
                        id: 'dislexia5',
                        title: '7 Pasos para detectar la Dislexia',
                        type: 'item',
                        icon: 'filter_5',
                        url: '/ui/page-layouts/dislexia5'
                    }
                ]
            },
            {
                id: 'control-panel',
                title: 'ESTUDIANTES',
                type: 'group',
                icon: 'supervised_user_circle',
                children: [
                    {
                        id: 'cron-jobs',
                        title: 'Calificaciones',
                        type: 'item',
                        icon: 'spellcheck',
                        url: '/apps/academico/orders'
                    },
                    {
                        id: 'maintenance-mode',
                        title: 'Lista',
                        type: 'item',
                        icon: 'format_list_numbered',
                        url: '/apps/academico/estudiante'
                    },
                    {
                        id: 'cron-jobs',
                        title: 'Resultados Dislexia',
                        type: 'item',
                        icon: 'spellcheck',
                        url: '/apps/academico/puntaje'
                    },
                ]
            },
            {
                id: 'agenda',
                title: 'AGENDA',
                type: 'group',
                icon: 'calendar_today',
                url: '/apps/calendar'
            },
        ];

        // Register the new navigation
        this._fuseNavigationService.register('admin-nav', adminNav);

        // Set the current navigation
        this._fuseNavigationService.setCurrentNavigation('admin-nav');
    }


    registerNewNavigationAndToggleInvitado(): void {
        const adminNav = [
            {
                id: 'admin',
                title: 'DISLEXIA',
                type: 'group',
                icon: 'apps',
                children: [
                    {
                        id: 'dislexia1',
                        title: 'Que es la Dislexia',
                        type: 'item',
                        icon: 'filter_1',
                        url: '/ui/page-layouts/dislexia1',
                    },
                    {
                        id: 'dislexia2',
                        title: 'PRODISLEX',
                        type: 'item',
                        icon: 'filter_2',
                        url: '/ui/page-layouts/dislexia2'
                    },
                    {
                        id: 'dislexia3',
                        title: 'Adaptaciones generales para alumnos',
                        type: 'item',
                        icon: 'filter_3',
                        url: '/ui/page-layouts/dislexia4'
                    },
                    {
                        id: 'dislexia4',
                        title: 'Adaptaciones generales para exámenes',
                        type: 'item',
                        icon: 'filter_4',
                        url: '/ui/page-layouts/dislexia3'
                    },
                    {
                        id: 'dislexia5',
                        title: '7 Pasos para detectar la Dislexia',
                        type: 'item',
                        icon: 'filter_5',
                        url: '/ui/page-layouts/dislexia5'
                    }
                ]
            },
            {
                id: 'cron-jobs',
                title: 'Cuentos',
                type: 'item',
                icon: 'spellcheck',
                url: '/apps/academy'
            },
            {
                id: 'juegos',
                title: 'Juegos',
                type: 'group',
                icon: 'apps',
                children: [
                    {
                        id: 'cron-jobs',
                        title: 'Ahorcado',
                        type: 'item',
                        icon: 'settings',
                        url: '/apps/ahorcado'
                    },
                    {
                        id: 'maintenance-mode',
                        title: 'Memoria',
                        type: 'item',
                        icon: 'build',
                        url: '/apps/memoria'
                    }
                ]
            },
            {
                id: 'maintenance-mode',
                title: 'Videos',
                type: 'item',
                icon: 'format_list_numbered',
                url: '/apps/videos/videos'
            },
            {
                id: 'maintenance-mode',
                title: 'Imagenes',
                type: 'item',
                icon: 'format_list_numbered',
                url: '/apps/cuentos'
            },
            {
                id: 'agenda',
                title: 'AGENDA',
                type: 'group',
                icon: 'calendar_today',
                url: '/apps/todo'
            },

        ];

        // Register the new navigation
        this._fuseNavigationService.register('admin-nav', adminNav);

        // Set the current navigation
        this._fuseNavigationService.setCurrentNavigation('admin-nav');
    }


    registerNewNavigationAndToggleEstudiante(): void {
        const adminNav = [
            {
                id: 'admin',
                title: 'DISLEXIA',
                type: 'group',
                icon: 'apps',
                children: [
                    {
                        id: 'dislexia1',
                        title: 'Que es la Dislexia',
                        type: 'item',
                        icon: 'filter_1',
                        url: '/ui/page-layouts/dislexia1',
                    },
                    {
                        id: 'dislexia2',
                        title: 'PRODISLEX',
                        type: 'item',
                        icon: 'filter_2',
                        url: '/ui/page-layouts/dislexia2'
                    },
                    {
                        id: 'dislexia3',
                        title: 'Adaptaciones generales para alumnos',
                        type: 'item',
                        icon: 'filter_3',
                        url: '/ui/page-layouts/dislexia4'
                    },
                    {
                        id: 'dislexia4',
                        title: 'Adaptaciones generales para exámenes',
                        type: 'item',
                        icon: 'filter_4',
                        url: '/ui/page-layouts/dislexia3'
                    },
                    {
                        id: 'dislexia5',
                        title: '7 Pasos para detectar la Dislexia',
                        type: 'item',
                        icon: 'filter_5',
                        url: '/ui/page-layouts/dislexia5'
                    }
                ]
            },
            {
                id: 'control-panel',
                title: 'TRATAMIENTO',
                type: 'group',
                icon: 'supervised_user_circle',
                children: [
                    {
                        id: 'cron-jobs',
                        title: 'Cuentos',
                        type: 'item',
                        icon: 'spellcheck',
                        url: '/apps/academy'
                    },
                    {
                        id: 'juegos',
                        title: 'Juegos',
                        type: 'group',
                        icon: 'apps',
                        children: [
                            {
                                id: 'cron-jobs',
                                title: 'Ahorcado',
                                type: 'item',
                                icon: 'settings',
                                url: '/apps/ahorcado'
                            },
                            {
                                id: 'maintenance-mode',
                                title: 'Memoria',
                                type: 'item',
                                icon: 'build',
                                url: '/apps/memoria'
                            }
                        ]
                    },
                    {
                        id: 'maintenance-mode',
                        title: 'Videos',
                        type: 'item',
                        icon: 'format_list_numbered',
                        url: '/apps/videos/videos'
                    },
                    {
                        id: 'maintenance-mode',
                        title: 'Imagenes',
                        type: 'item',
                        icon: 'format_list_numbered',
                        url: '/apps/cuentos'
                    }
                ]
            },
            {
                id: 'agenda',
                title: 'PRE DIAGNÓSTICO',
                type: 'group',
                icon: 'calendar_today',
                url: '/apps/prediagnostico'
            },

            {
                id: 'perfil',
                title: 'CALIFICACIONES',
                type: 'group',
                icon: 'apps',
                url: '/apps/academico/calificacion'
            }
        ];

        // Register the new navigation
        this._fuseNavigationService.register('admin-nav', adminNav);

        // Set the current navigation
        this._fuseNavigationService.setCurrentNavigation('admin-nav');
    }
}
