import { DataProviderService, EventDetailsResp } from './../data-provider.service';


import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.css']
})
export class TableViewComponent implements OnInit {

  private dataProvider:DataProviderService;
  private listOfEvents:EventDetailsResp[];

  get ListOfEvents(){
    return this.listOfEvents;
  }
  @Output('tableChange') updateNavBar= new EventEmitter();  
  actualClicked:EventDetailsResp;

  constructor(service: DataProviderService) { 
    this.dataProvider=service;
  }

  updateList(obj){
    this.listOfEvents=this.ListOfEvents.filter(({ id }) => id !== obj);
    // console.log("table view",obj);
    // this.updateNavBar.emit(obj);
  }
  
  

  ngOnInit(): void {
    this.dataProvider.GetListOfEventDetails().subscribe(
    (data: {}) => {
      this.listOfEvents = data as Array<EventDetailsResp>;
      console.log(data);
  });
  }
}
