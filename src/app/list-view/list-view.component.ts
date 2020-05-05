import { DataProviderService } from './../data-provider.service';
import { User } from './../table-panel/table-panel.component';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {

  list:User[];
  constructor(service:DataProviderService) { 
    this.list=service.load();
  }
  @Output() selected=new EventEmitter;
  ngOnInit(): void {
  }
  RowSelected(u:User){
    this.selected.emit(u);
    console.log(u);   // declare variable in component.
  }

}
