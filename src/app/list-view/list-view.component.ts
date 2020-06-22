import { DataProviderService, EventDetails } from './../data-provider.service';

import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {
  
  dataProvider:DataProviderService;
  list:EventDetails[];
  formIsHidden
  constructor(service:DataProviderService) { 
    this.dataProvider=service;
  }

  @Output() selected=new EventEmitter;

  ngOnInit(): void {
    this.dataProvider.GetListOfEventDetails()
    .subscribe((data: {}) => {
      this.list = data as Array<EventDetails>;
      console.log(data);
    })
  }

  RowSelected(u:EventDetails){
    this.selected.emit(u);
    console.log(u);   // declare variable in component.
  }

}
