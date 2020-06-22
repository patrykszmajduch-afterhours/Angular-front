import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TablePanelComponent } from './table-panel/table-panel.component';
import { HttpClientModule } from '@angular/common/http';
import { TableViewComponent } from './table-view/table-view.component';
import { ListViewComponent } from './list-view/list-view.component';
import { DetailsComponent } from './details/details.component';
import { FormCreateComponent } from './form-create/form-create.component';

// import { ListViewComponent } from './list-view/list-view.component';
@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    TablePanelComponent,
    TableViewComponent,
    ListViewComponent,
    DetailsComponent,
    FormCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,  
  ],
  providers: [],
  bootstrap: [AppComponent]
}

)
export class AppModule { }
