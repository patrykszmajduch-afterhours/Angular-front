import { Router } from '@angular/router';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EventDetailsResp, DataProviderService } from '../data-provider.service';
import { DataStoreService } from '../data-store.service';

@Component({
  selector: 'table-panel',
  templateUrl: './table-panel.component.html',
  styleUrls: ['./table-panel.component.css']
})
export class TablePanelComponent implements OnInit {
  @Input()model:EventDetailsResp;
  private dataStore:DataStoreService;
  private dataProvider:DataProviderService;
  constructor(dataStore:DataStoreService,dataProvider:DataProviderService,private router:Router) { 
    this.dataStore=dataStore
    this.dataProvider=dataProvider;
  }
  onClick(){
    this.router.navigate(["/event/"+this.model.id]);
    // console.log(this.model);
    // this.iWasClick.emit(this.model);
  }
  ngOnInit(): void {
  }
  @Output('change') iWasClick= new EventEmitter();
  editModel(){
    this.dataStore.Model=this.model;
    console.log("Nawiguje!:",this.model);
    this.router.navigate(['edit']);
  }
  deleteModel(){
    this.dataProvider.DeleteEventDetails(this.model.id).subscribe(resp=>console.log(resp),err=>console.log(err),()=>{console.log("Success!");this.iWasClick.emit(this.model.id)});
  }
}
