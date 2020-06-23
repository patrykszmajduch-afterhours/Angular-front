import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EventDetails, DataProviderService } from '../data-provider.service';
import { DataStoreService } from '../data-store.service';

@Component({
  selector: 'table-panel',
  templateUrl: './table-panel.component.html',
  styleUrls: ['./table-panel.component.css']
})
export class TablePanelComponent implements OnInit {
  @Input()model:EventDetails;
  private dataStore:DataStoreService;
  private dataProvider:DataProviderService;
  constructor(dataStore:DataStoreService,dataProvider:DataProviderService) { 
    this.dataStore=dataStore
    this.dataProvider=dataProvider;
  }
  onClick(){
    console.log(this.model);
    this.iWasClick.emit(this.model);
  }
  ngOnInit(): void {
  }
  @Output('change') iWasClick= new EventEmitter();
  editModel(){
    this.dataStore.Model=this.model;

  }
  
}
