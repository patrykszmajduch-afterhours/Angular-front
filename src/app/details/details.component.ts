import { DataProviderService, EventDetailsResp } from './../data-provider.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import {Location} from '@angular/common';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  constructor(private route:ActivatedRoute,private dataProvider:DataProviderService,private _location: Location) { }
  public model:EventDetailsResp;
  ngOnInit(): void {
    this.route.paramMap
    .subscribe(params=>{
      let id=+params.get('id');
      this.dataProvider.GetEventDetails(id).subscribe(resp=>{
        console.log(resp);
        this.model=resp;
        },error=>{console.log(error);this._location.back();});
    })
  }
  // get Temp(){
  // let temp = {} as EventDetailsResp;
  //   temp.id=2;
  //   temp.title="tytul test";
  //   temp.info="nanana";
  //   temp.type="Film";
  //   temp.date=new Date(2066);
  //   temp.location="Warszawa";
  //   temp.imgName="1";
  //   return temp;
  // }

}
