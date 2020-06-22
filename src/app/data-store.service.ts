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
}
