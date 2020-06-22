import { DataProviderService, EventDetails } from './../data-provider.service';


import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.css']
})
export class TableViewComponent implements OnInit {

  private dataProvider:DataProviderService;
  private listOfEvents:EventDetails[];

  get ListOfEvents(){
    return this.listOfEvents;
  }
  @Output('tableChange') updateNavBar= new EventEmitter();  
  actualClicked:EventDetails;

  constructor(service: DataProviderService) { 
    this.dataProvider=service;
  }

  updateClick(obj){
    console.log("table view",obj);
    this.updateNavBar.emit(obj);
  }
  
  

  ngOnInit(): void {
    this.dataProvider.GetListOfEventDetails().subscribe(
    (data: {}) => {
      this.listOfEvents = data as Array<EventDetails>;
      console.log(data);
  });
  }
}
