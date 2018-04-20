import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './main/home/home.component';
import { FarmDetailsComponent } from './main/farm_details/farmDetails.component';

 
const routes: Routes = [
    { path: '', redirectTo: 'farms', pathMatch: 'full' },
    { path: 'farms',  component: HomeComponent },
    { path: 'farms/:code', component: FarmDetailsComponent }
];
 
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}