import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-vocal',
  templateUrl: './vocal.component.html',
  styleUrls: ['./vocal.component.css']
})
export class VocalComponent implements OnInit {

  @Input() vocal:string;
  @Input() indice1:string;


  constructor() { }

  ngOnInit() {
  }

}
