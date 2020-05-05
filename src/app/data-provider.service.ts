import { User } from './table-panel/table-panel.component';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataProviderService {

   private list: User[] = [{
     id:0,
    name: "Patryk",
    surname: "szmadjcuh",
    job: "none",
    age: 23,
    imgUrl:"assets/avatar_2.png"
  }, {
    id:1,
    name: "Ben",
    surname: "Jan",
    job: "none",
    age: 25,
    imgUrl:"assets/avatar_1.png"
  },{
    id:2,
    name: "Ben",
    surname: "Jan",
    job: "none",
    age: 25,
    imgUrl:"assets/avatar_3.png"
  },{
    id:3,
    name: "Ben",
    surname: "Jan",
    job: "none",
    age: 25,
    imgUrl:"assets/avatar_4.png"
  },{
    id:4,
    name: "Ben",
    surname: "Pan",
    job: "none",
    age: 25,
    imgUrl:"assets/avatar_5.png"
  }
  ];
  selected:User;
  updateSelected(obj:User){
    this.selected=obj;
  }
  constructor() { }
  load() {
    return this.list;
  }
}
