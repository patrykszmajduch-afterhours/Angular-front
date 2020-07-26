import { AuthService } from './../auth.service';
import { DataStoreService } from './../data-store.service';
import { DataProviderService, EventDetailsResp } from './../data-provider.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {Location} from '@angular/common';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  constructor(private route:ActivatedRoute,private router:Router,private dataProvider:DataProviderService,private _location: Location,private dataStore:DataStoreService,public auth:AuthService) { }
  public model:EventDetailsResp;
  ngOnInit(): void {
    this.route.paramMap
    .subscribe(params=>{
      let id=+params.get('id');
      this.dataProvider.GetEventDetails(id).subscribe(resp=>
        {console.log(resp);
        this.model=resp;},
        error=>{console.log(error);this._location.back();});
    })
  }
  editModel(){
    this.dataStore.Model=this.model;
    console.log("Nawiguje!:",this.model);
    this.router.navigate(['edit']);
  }
  deleteModel(){
    this.dataProvider.DeleteEventDetails(this.model.id).subscribe(resp=>console.log(resp),err=>console.log(err),()=>{this._location.back()});
  }
  back(){
    this._location.back();
  }
}
