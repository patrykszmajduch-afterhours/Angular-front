
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataProviderService {

   
  selected:EventDetailsResp;
  updateSelected(obj:EventDetailsResp){
    this.selected=obj;
  }
  
  private http: HttpClient;
  private listData: EventDetailsResp[];
  private jsonList: Observable<JSON[]>;
  private url="http://localhost:8080/";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(http: HttpClient) {
    this.http = http;
    // this.jsonList=
  } 

 //POST
 CreateEventDetails(obj:EventDetailsResp):Observable<EventDetailsResp>{
   console.log("create event details"+ JSON.stringify(obj) );
  return this.http.post<EventDetailsResp>(this.url + 'eventdetails/', JSON.stringify(obj), this.httpOptions)
  .pipe(
    retry(1),
    catchError(this.errorHandl)
  )
}
//put
UpdateEventDetails(data:EventDetailsResp):Observable<EventDetailsResp>
{
  return this.http.put<EventDetailsResp>(this.url + 'eventdetails/', JSON.stringify(data), this.httpOptions)
  .pipe(
    retry(1),
    catchError(this.errorHandl)
  )
}
  //GET LIST
  GetListOfEventDetails(): Observable<EventDetailsResp[]>{
    console.log("wywołanie w service ",this.http.get(this.url+"eventdetails/list", { observe: 'response' }));
     return this.http.get<EventDetailsResp[]>(this.url+"eventdetails/").pipe(
      retry(1),
      catchError(this.errorHandl)
    );     
  }
  //GET
  GetEventDetails(id:number): Observable<EventDetailsResp>{
    return this.http.get<EventDetailsResp>(this.url+"eventdetails/"+id).pipe(
      retry(1),
      catchError(this.errorHandl)
    ); 
  }
  //DELETE
  DeleteEventDetails(id:number):Observable<EventDetailsResp>{
    return this.http.delete<EventDetailsResp>(this.url + 'eventdetails/' + id, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }
    
  // Error handling
   errorHandl(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
 }
}
export interface EventDetailsResp{
  id:number;
  title:string;
  type:string;
  info:string;
  location:string;
  date:Date;
  imgExt:string|ArrayBuffer;
  img:string|ArrayBuffer;
}
export interface EventDetailsCommunicationTEST{
  id:number;
  title:string;
  type:string;
  info:string;
  location:string;
  date:Date;
  imgExt:string;
  img:string|ArrayBuffer;
}
