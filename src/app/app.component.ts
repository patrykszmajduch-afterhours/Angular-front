import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Zad1';

  updateData(obj){
    console.log("main container!!!!!!",obj);
  }
  
}
