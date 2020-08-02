import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from "../../../../@fuse/animations";

@Component({
    selector: 'app-dislexia-prueba',
    templateUrl: './dislexia-prueba.component.html',
    styleUrls: ['./dislexia-prueba.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class DislexiaPruebaComponent implements OnInit {

    constructor() {
    }

    ngOnInit(): void {
    }

}
