import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'table-panel',
  templateUrl: './table-panel.component.html',
  styleUrls: ['./table-panel.component.css']
})
export class TablePanelComponent implements OnInit {
  @Input()model:User;
  constructor() { }
  onClick(){
    console.log(this.model);
    this.iWasClick.emit(this.model);
  }
  ngOnInit(): void {
  }
  @Output('change') iWasClick= new EventEmitter();
}
export interface User{
  id:number;
  name:string;
  surname:string;
  age:number;
  job:string;
  imgUrl:string;
}