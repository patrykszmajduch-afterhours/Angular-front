import { AuthService } from './../auth.service';
import { DataStoreService } from './../data-store.service';
import { Router } from '@angular/router';
import { DataProviderService, EventDetailsResp } from './../data-provider.service';

import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {
  
 
  list:EventDetailsResp[];
  pageOfItems: Array<any>;
  
  constructor(private dataProvider:DataProviderService, private router:Router,private dataStore:DataStoreService,public auth:AuthService) { 
  }

  @Output() selected=new EventEmitter;

  ngOnInit(): void {
    this.dataProvider.GetListOfEventDetails()
    .subscribe((data: {}) => {
      this.list = data as Array<EventDetailsResp>;
      console.log(data);
    })
  }

  RowSelected(model:EventDetailsResp){
    this.router.navigate(["/event/"+model.id]);;   // declare variable in component.
  }

  editModel(model){
    this.dataStore.Model=model;
    console.log("Nawiguje!:",model);
    this.router.navigate(['edit']);
  }
  deleteModel(model){
    this.dataProvider.DeleteEventDetails(model.id).subscribe(resp=>console.log(resp),err=>console.log(err),()=>{console.log("Success!");});
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }
}
