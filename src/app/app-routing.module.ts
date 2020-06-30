import { EditFormComponent } from './edit-form/edit-form.component';
import { FormCreateComponent } from './form-create/form-create.component';
import { DetailsComponent } from './details/details.component';
import { TableViewComponent } from './table-view/table-view.component';
import { ListViewComponent } from './list-view/list-view.component';



import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



const routes: Routes = [
  { path: 'list', component: ListViewComponent },
  { path: 'table', component: TableViewComponent },
  { path: 'event/:id', component: DetailsComponent },
  { path: 'create', component: FormCreateComponent },
  { path: 'edit', component: EditFormComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
