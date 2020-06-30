import { DataProviderService, EventDetailsResp } from './../data-provider.service';

import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {
  
  dataProvider:DataProviderService;
  list:EventDetailsResp[];
  formIsHidden
  constructor(service:DataProviderService) { 
    this.dataProvider=service;
  }

  @Output() selected=new EventEmitter;

  ngOnInit(): void {
    this.dataProvider.GetListOfEventDetails()
    .subscribe((data: {}) => {
      this.list = data as Array<EventDetailsResp>;
      console.log(data);
    })
  }

  RowSelected(u:EventDetailsResp){
    this.selected.emit(u);
    console.log(u);   // declare variable in component.
  }

}
