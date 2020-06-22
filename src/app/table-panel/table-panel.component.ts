import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EventDetails } from '../data-provider.service';

@Component({
  selector: 'table-panel',
  templateUrl: './table-panel.component.html',
  styleUrls: ['./table-panel.component.css']
})
export class TablePanelComponent implements OnInit {
  @Input()model:EventDetails;
  constructor() { }
  onClick(){
    console.log(this.model);
    this.iWasClick.emit(this.model);
  }
  ngOnInit(): void {
  }
  @Output('change') iWasClick= new EventEmitter();
}
