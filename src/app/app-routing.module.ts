import { EditFormComponent } from './edit-form/edit-form.component';
import { FormCreateComponent } from './form-create/form-create.component';
import { DetailsComponent } from './details/details.component';
import { TableViewComponent } from './table-view/table-view.component';
import { ListViewComponent } from './list-view/list-view.component';



import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';



const routes: Routes = [
  { path: 'list', component: ListViewComponent,canActivate: [AuthGuard] },
  { path: 'table', component: TableViewComponent,canActivate: [AuthGuard] },
  { path: 'event/:id', component: DetailsComponent,canActivate: [AuthGuard] },
  { path: 'create', component: FormCreateComponent,canActivate: [AuthGuard] },
  { path: 'edit', component: EditFormComponent,canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
