import { ExportCsvService } from './../export-csv.service';
import { AuthService } from './../auth.service';

import { EventDetailsResp } from './../data-provider.service';

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faSearch,faFileCsv } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {

  @Input() eventList: EventDetailsResp[];
  @Output() eventListChange = new EventEmitter<EventDetailsResp[]>();

  eventListOrg: EventDetailsResp[] = [];
  searchIcon = faSearch;
  exportIcon = faFileCsv;
  currentFiltrData: FiltrData;
  datePop: Date;
  initList;

  constructor(private service: AuthService, private exportCsv:ExportCsvService) {

    this.form = new FormGroup({
      controlTitle: new FormControl(''),
      controlType: new FormControl(''),
      controlInfo: new FormControl(''),
      controlLocation: new FormControl(''),
      controlDate: new FormControl(''),
    });
    this.currentFiltrData = <FiltrData>(JSON.parse(localStorage.getItem(service.currentUserValue.username + "Filtrs")));
    console.log(this.eventList);
    this.populateData(this.currentFiltrData);
  }

  initFiltrs() {
    this.initList = false;
    new Promise(resolve => {
      while (this.eventList === undefined) {
        console.log("promises");
      }
    }).then(() => { this.btnSearch(); this.initList = false; });
    console.log('I will not wait until promise is resolved');
  }
  test: String;
  form: FormGroup;


  btnSearch() {
    if (this.eventList !== null && this.eventList !== undefined) {
      if (this.eventListOrg.length == 0) {
        this.eventListOrg = this.eventList;
      }
      else{
        this.eventList=this.eventListOrg;
      }
      console.log("Wartosc title", this.title);
      this.test = this.title;

      if (this.title) {
        this.test = this.title;
        this.eventList = this.filterByTitle(this.eventList, this.test);
      }
      if (this.type) {
        this.test = this.type;
        this.eventList = this.filterByType(this.eventList, this.test);
      }
      if (this.location) {
        this.test = this.title;
        this.eventList = this.filterByLocation(this.eventList, this.test);
      }
      if (this.info) {
        this.test = this.title;
        this.eventList = this.filterByInfo(this.eventList, this.test);
      }

      if (this.dateValue) {
        this.eventList = this.filterByDate(this.eventList, this.date);
        console.log("Po date filtr", this.eventList);
      }
      this.eventListChange.emit(this.eventList);
      console.log("search button", this.eventList);
      this.saveLocalStore();
    }
  }
  get title() {
    return this.form.get('controlTitle').value;
  }
  get type() {
    return this.form.get('controlType').value;
  }
  get info() {
    return this.form.get('controlInfo').value;
  }
  get location() {
    return this.form.get('controlLocation').value;
  }
  get date() {
    return new Date(this.form.get('controlDate').value);
  }
  get dateValue() {
    return this.form.get('controlDate').value;
  }

  filterByTitle(array: EventDetailsResp[], string) {
    return array
      .filter(o => o
        .title.
        toLowerCase()
        .includes(
          string.toLowerCase()
        ));
  }
  filterByDate(array: EventDetailsResp[], date: Date) {
    date.setHours(0, 0, 0, 0);
    return array
      .filter(o => {
        let dateToCompare = new Date(o.date.toString());
        dateToCompare.setHours(0, 0, 0, 0);
        return dateToCompare.getTime() == date.getTime();
      });
  }
  filterByInfo(array: EventDetailsResp[], string) {
    return array
      .filter(o => o
        .info.
        toLowerCase()
        .includes(
          string.toLowerCase()
        ));
  }
  filterByLocation(array: EventDetailsResp[], string) {
    return array
      .filter(o => o
        .location.
        toLowerCase()
        .includes(
          string.toLowerCase()
        ));
  }
  filterByType(array: EventDetailsResp[], string) {
    array[0].type
    return array
      .filter(o => o
        .type.
        toLowerCase()
        .includes(
          string.toLowerCase()
        ));
  }

  populateData(data: FiltrData) {
    if (data != null) {
      this.form.patchValue({
        controlTitle: data.title,
        controlType: data.type,
        controlInfo: data.info,
        controlLocation: data.location,
        controlDate: "",
      });
      this.datePop = data.date;
      // this.btnSearch();
    }
  }
  saveLocalStore() {
    this.currentFiltrData = {
      title: this.title,
      info: this.info,
      type: this.type,
      location: this.location,
      date: this.date.getTime() == 0 ? null : this.date
    }
    localStorage.setItem(this.service.currentUserValue.username + "Filtrs", JSON.stringify(this.currentFiltrData));
  }
  cleareFiltr() {
    this.form.reset();
    localStorage.removeItem(this.service.currentUserValue.username + "Filtrs");
    if (this.eventListOrg.length != 0) { 
      this.eventList = this.eventListOrg; 
    this.eventListChange.emit(this.eventList);}

    console.log("Do JSON",JSON.stringify(this.eventListOrg));
  }

  exportData(){

    this.exportCsv.downloadFile(this.eventList,"CSVList");
  }
}
interface FiltrData {
  title: String;
  info: String;
  type: String;
  location: String;
  date: Date;
}