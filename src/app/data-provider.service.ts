
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataProviderService {

   
  selected:EventDetails;
  updateSelected(obj:EventDetails){
    this.selected=obj;
  }
  
  private http: HttpClient;
  private listData: EventDetails[];
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
 CreateEventDetails(obj:EventDetails):Observable<EventDetails>{
   console.log("create event details"+ JSON.stringify(obj) );
  return this.http.post<EventDetails>(this.url + 'eventdetails/', JSON.stringify(obj), this.httpOptions)
  .pipe(
    retry(1),
    catchError(this.errorHandl)
  )
}
//put
UpdateEventDetails(id,data:EventDetails):Observable<EventDetails>
{
  return this.http.put<EventDetails>(this.url + 'update/'+id, JSON.stringify(data), this.httpOptions)
  .pipe(
    retry(1),
    catchError(this.errorHandl)
  )
}
  //GET LIST
  GetListOfEventDetails(): Observable<EventDetails[]>{
    console.log("wywołanie w service ",this.http.get(this.url+"eventdetails/list", { observe: 'response' }));
     return this.http.get<EventDetails[]>(this.url+"eventdetails/").pipe(
      retry(1),
      catchError(this.errorHandl)
    );     
  }
  //GET
  GetEventDetails(id:number): Observable<EventDetails>{
    return this.http.get<EventDetails>(this.url+"eventdetails/"+id).pipe(
      retry(1),
      catchError(this.errorHandl)
    ); 
  }
  //DELETE
  DeleteEventDetails(id:number):Observable<EventDetails>{
    return this.http.delete<EventDetails>(this.url + 'eventdetails/' + id, this.httpOptions)
    .pipe(
      retry(),
      catchError(this.errorHandl)
    )
  }
  // GetEventPhoto(id:number):Observable<Blob>{
  //   return this.http.get<Blob>(this.url+id, { responseType: 'blob' }).pipe(
  //     retry(1),
  //     catchError(this.errorHandl)
  //   ); 
  // }
  SaveImg(){
    
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
export interface EventDetails{
  id:number;
  title:string;
  type:string;
  info:string;
  location:string;
  date:Date;
  imgUrl:string;
}