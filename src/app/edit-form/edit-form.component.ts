import { AuthService } from './../auth.service';
import { EventDetailsResp } from './../data-provider.service';
import { Component, OnInit, Input } from '@angular/core';
import { DataProviderService } from '../data-provider.service';
import { Location, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataStoreService } from '../data-store.service';


@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css']
})
export class EditFormComponent implements OnInit {

  dataProvider: DataProviderService;
  model: EventDetailsResp;
  //image fields
  private imgExt: string | ArrayBuffer;
  imgURL: string | ArrayBuffer;
  public message: string;
  public dateVal: Date;

  form = new FormGroup({
    eventIdControl: new FormControl('', Validators.required),
    eventImageControl: new FormControl(null),
    eventTitleControl: new FormControl('', Validators.required),
    eventInfoControl: new FormControl('', Validators.required),
    eventTypeControl: new FormControl('', Validators.required),
    eventLocationControl: new FormControl('', Validators.required),
    eventDateControl: new FormControl('', Validators.required)
  });


  constructor(dataProvider: DataProviderService, private router: Router, private dataStore: DataStoreService, private _location: Location) {
    this.dataProvider = dataProvider;
  }

  ngOnInit(): void {
    let model = this.dataStore.Model;
    console.log("Edycja!", model);
    if (model === undefined)
      this._location.back();

    this.form.patchValue({
      eventIdControl: model.id,
      eventTitleControl: model.title,//'password')
      eventInfoControl: model.info,
      eventTypeControl: model.type,//TODO: MUsi być polem wyboru typu lista
      eventLocationControl: model.location,
      eventDateControl: "",
      eventImageControl: ""
    });
    this.imgURL = model.img;
    this.dateVal = model.date;
    this.imgExt = model.imgExt;
    this.model = model;

    this.dataStore.Model = undefined;
  }

  //GET
  get eventIdDetails() {
    return this.form.get('eventIdControl').value;
  }
  get eventTile() {
    return this.form.get('eventTitleControl').value;
  }
  get eventInfo() {
    return this.form.get('eventInfoControl').value;
  }
  get type() {
    return this.form.get('eventTypeControl').value
  }
  get date() {
    return this.form.get('eventDateControl').value;
  }
  get location() {
    return this.form.get('eventLocationControl').value;
  }
  get image() {
    return this.form.get('eventImageControl').value;
  }


  BuildRequest(): EventDetailsResp {

    let temp = {} as EventDetailsResp;
    temp.id = this.eventIdDetails;
    temp.title = this.eventTile;
    temp.info = this.eventInfo;
    temp.type = this.type;
    temp.date = this.date;
    temp.location = this.location;
    temp.imgExt = this.imgExt;
    temp.img = this.imgURL;

    console.log("Obraz wyglada tak", this.imgURL);

    console.log("Build request ", temp);
    return temp;
  }
  SendRequest() {
    var temp = this.BuildRequest();

    this.dataProvider.UpdateEventDetails(temp).subscribe(
      resp => {
        console.log(resp);
      },
      error => console.log(error),
      () => this._location.back());
  }





  preview(files) {
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
    this.imgExt = (files[0].name.split("."))[1];

    var reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }
}
