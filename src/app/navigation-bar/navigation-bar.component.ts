import { User } from './../table-panel/table-panel.component';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faTable} from '@fortawesome/free-solid-svg-icons';
import { faListAlt} from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {
  tableIcon=faTable;
  listIcon=faListAlt;
  title:string="zad1";
  currentView:ViewType=ViewType.List;
  @Output() change=new EventEmitter();
  @Input() exampleText="";
  constructor() { }
  ngOnInit(): void {
  }
  displayView(event){
    this.currentView=(event.target.id=="tableBtn")?ViewType.Table:ViewType.List;
    this.change.emit(this.currentView);
  }
  
 
}
export enum ViewType{
  Table,
  List
} 