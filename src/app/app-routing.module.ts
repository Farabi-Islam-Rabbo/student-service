import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from 'src/pages/dashboard/dashboard.component';
import { LoginComponent } from 'src/pages/login/login.component';
import {HomePageComponent} from '../pages/home-page/home-page.component'

const routes: Routes = [
  { path: 'home-page', component: HomePageComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: LoginComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
