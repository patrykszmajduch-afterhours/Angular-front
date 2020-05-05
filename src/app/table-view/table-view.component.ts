import { DataProviderService } from './../data-provider.service';
import { User } from './../table-panel/table-panel.component';

import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.css']
})
export class TableViewComponent implements OnInit {

  private dataProvider:DataProviderService;
  listOfUsers:User[];

  @Output('tableChange') updateNavBar= new EventEmitter();  
  actualClicked:User;

  constructor(service: DataProviderService) { 
    this.listOfUsers=service.load();
    this.dataProvider=service;
  }

  updateClick(obj){
    console.log("table view",obj);
    this.updateNavBar.emit(obj);
  }
  
  

  ngOnInit(): void {
  }

}
