import {Component, OnInit} from '@angular/core';
import {fuseAnimations} from "../../../../@fuse/animations";

@Component({
    selector: 'app-videos',
    templateUrl: './videos.component.html',
    styleUrls: ['./videos.component.scss'],

    animations: fuseAnimations
})
export class VideosComponent implements OnInit {

    constructor() {
    }

    ngOnInit(): void {
    }

}
