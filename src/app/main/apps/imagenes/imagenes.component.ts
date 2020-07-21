import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Subject} from "rxjs";
import {fuseAnimations} from "../../../../@fuse/animations";

@Component({
    selector: 'app-imagenes',
    templateUrl: './imagenes.component.html',
    styleUrls: ['./imagenes.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ImagenesComponent implements OnInit {

    photosVideos: any;
    period = [
        {
            imagen: '/assets/imagenes/bd.jpg',
            nombre: ' b - d'
        },
        {
            imagen: '/assets/imagenes/MW.jpg',
            nombre: ' m - w'
        },
        {
            imagen: '/assets/imagenes/pq.jpg',
            nombre: ' p - q'
        },
        {
            imagen: '/assets/imagenes/ZN.jpg',
            nombre: ' Z - N'
        },
        {
            imagen: '/assets/imagenes/3E.jpg',
            nombre: ' 3 - E'
        },
        {
            imagen: '/assets/imagenes/17.jpg',
            nombre: ' 1 - 7'
        },
        {
            imagen: '/assets/imagenes/47.jpg',
            nombre: ' 4 - 7'
        },
        {
            imagen: '/assets/imagenes/1331.jpg',
            nombre: '13 - 31'
        },
    ]

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ProfileService} _profileService
     */
    constructor() {
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

    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
