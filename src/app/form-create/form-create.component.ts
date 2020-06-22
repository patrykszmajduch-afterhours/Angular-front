import { EventDetails } from './../data-provider.service';
import { Component, OnInit, Input } from '@angular/core';
import { DataProviderService } from '../data-provider.service';

import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-form-create',
  templateUrl: './form-create.component.html',
  styleUrls: ['./form-create.component.css']
})
export class FormCreateComponent implements OnInit {
  dataProvider: DataProviderService;
  public isHidden = true;
  @Input() public model: EventDetails;
  @Input() edit=false;
  form= new FormGroup({
    eventIdControl: new FormControl(''),
    eventTitleControl: new FormControl('',Validators.required),//'password')
    eventInfoControl:new FormControl('',Validators.required),
    eventTypeControl:new FormControl('',Validators.required),//TODO: MUsi być polem wyboru typu lista
    eventLocationControl:new FormControl('',Validators.required),
    eventDateControl:new FormControl('',Validators.required),
  });
  
  constructor(dataProvider: DataProviderService,private router: Router) {
    this.dataProvider = dataProvider;
  }
  
  ngOnInit(): void {
    console.log(this.model+ " "+this.edit);
    if (this.model!==undefined){
      console.log("działam!!!!!!!");
      this.form.setValue({
      eventIdControl: this.model.id,
      eventTitleControl: this.model.title,//'password')
      eventInfoControl: this.model.info,
      eventTypeControl: this.model.type,//TODO: MUsi być polem wyboru typu lista
      eventLocationControl: this.model.location,
      eventDateControl: this.model.date})
    }
    else{
      console.log("Nie dzialam");
    }
  }
  //GET
  get IsHidden() {
    return this.isHidden;
  }
  get Edit(){
    return this.edit;
  }
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

  BuildRequest():EventDetails{
    let temp = {} as EventDetails;
    temp.id=this.eventIdDetails;
    temp.title=this.eventTile;
    temp.info=this.eventInfo;
    temp.type=this.type;
    temp.date=this.date;
    temp.location=this.location;
    temp.imgUrl="1";
    console.log("Build request "+temp);
    return temp;
  }
  SendRequest(){
    var temp=this.BuildRequest();
    this.dataProvider.CreateEventDetails(temp).subscribe(
      resp=>{console.log(resp);
      },
      error=>console.log(error),
      ()=> this.router.navigate(['/list']))
  }
  createForm(){
    this.edit==true?this.form.disable():this.form.enable();
    this.edit=this.edit==true?false:true;
  }
}
