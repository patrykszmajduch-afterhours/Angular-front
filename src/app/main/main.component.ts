import { ViewType } from './../navigation-bar/navigation-bar.component';
import { Component, OnInit } from '@angular/core';
import { User } from '../table-panel/table-panel.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  exampleText="";
  displayView=ViewType.Table;
  constructor() { }

  ngOnInit(): void {
  }

  updateNavBar(obj:User){
    console.log("main view obj!!!!!!",obj);
    this.exampleText= "    ID: "+obj.id+" Name: "+obj.name+" Surname:"+obj.surname;
  }
  changeView(obj:ViewType){
    this.displayView=obj;
  }
}
