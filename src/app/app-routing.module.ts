import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard}from "./auth.guard";
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';


const routes: Routes = [
  {path:'dashboard',component:DashboardComponent,canActivate:[AuthGuard]},
  {path:'403',component:UnauthorizedComponent},
  {path:'**',component:NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }
