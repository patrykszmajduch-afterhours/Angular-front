import { EventDetails } from './data-provider.service';
import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService implements OnInit {

  private editId:number;
  private model:EventDetails;
  constructor() { 

  }
  ngOnInit(): void {
    
  }
  set Model(model:EventDetails){
    this.model=model;
  }
  get Model(){
    let temp = {} as EventDetails;
    temp.id=2;
    temp.title="this.eventTile";
    temp.info="Info";
    temp.type="baton";
    let date: Date = new Date(); 
    temp.date=date;
    temp.location="test";
    temp.imgUrl="1";
    // return this.model;
    return temp;
  }
}
