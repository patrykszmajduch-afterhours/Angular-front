import { EventDetailsResp } from './../data-provider.service';
import { Component, OnInit, Input } from '@angular/core';
import { DataProviderService } from '../data-provider.service';
import {Location} from '@angular/common';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataStoreService } from '../data-store.service';


@Component({
  selector: 'app-form-create',
  templateUrl: './form-create.component.html',
  styleUrls: ['./form-create.component.css']
})
export class FormCreateComponent{

  dataProvider: DataProviderService;

  //image fields
  private imgExt:string;
  imgURL: string | ArrayBuffer;
  public message: string;


  form= new FormGroup({
    eventIdControl: new FormControl(''),
    eventImageControl:new FormControl(null,Validators.required),
    eventTitleControl: new FormControl('',Validators.required),
    eventInfoControl:new FormControl('',Validators.required),
    eventTypeControl:new FormControl('',Validators.required),
    eventLocationControl:new FormControl('',Validators.required),
    eventDateControl:new FormControl('',Validators.required)
  });
  
  
  constructor(dataProvider: DataProviderService,private router: Router,dataStore:DataStoreService,private _location: Location) {
    this.dataProvider = dataProvider; 
  }
  

  //GET
  get eventIdDetails(){
    return this.form.get('eventIdControl').value;
  }
  get eventTile(){
    return this.form.get('eventTitleControl').value;
  }
  get eventInfo(){
    return this.form.get('eventInfoControl').value;
  }
  get type(){
    return  this.form.get('eventTypeControl').value
  }
  get date(){
    return this.form.get('eventDateControl').value;
  }
  get location(){
    return this.form.get('eventLocationControl').value;
  }
  get image(){
    return this.form.get('eventImageControl').value;
  }


  BuildRequest():EventDetailsResp{

    let temp = {} as EventDetailsResp;
    temp.id=this.eventIdDetails;
    temp.title=this.eventTile;
    temp.info=this.eventInfo;
    temp.type=this.type;
    temp.date=this.date;
    temp.location=this.location;
    temp.imgExt=this.imgExt;
    temp.img=this.imgURL;

    console.log("Obraz wyglada tak",this.imgURL);
    
    console.log("Build request ",temp);
    return temp;
  }
  SendRequest(){
    var temp=this.BuildRequest();

    this.dataProvider.CreateEventDetails(temp).subscribe(
      resp=>{console.log(resp);
      },
      error=>console.log(error),
      ()=> this._location.back())//()=> this.router.navigate(['/list'])
  }
  




  preview(files) {
    if (files.length === 0)
      return;
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
    this.imgExt=(files[0].name.split("."))[1];

    var reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }
}
