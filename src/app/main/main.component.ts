import { ViewType } from './../navigation-bar/navigation-bar.component';
import { Component, OnInit } from '@angular/core';
import { EventDetails } from '../data-provider.service';

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

  updateNavBar(obj:EventDetails){
    console.log("main view obj!!!!!!",obj);
    this.exampleText= "    ID: "+obj.id+" Name: "+obj.title+" Surname:"+obj.info;
  }
  changeView(obj:ViewType){
    this.displayView=obj;
  }
}
