import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './main/home/home.component';
import { FarmDetailsComponent } from './main/farm_details/farmDetails.component';
import { FarmDetailsEditComponent } from './main/farm_details_edit/farmDetailsEdit.component';
import { MillerDetailsComponent } from './main/miller_details/millerDetails.component';
import { FarmAddComponent } from './main/farm_add/farmAdd.component';

 
const routes: Routes = [
    { path: '', redirectTo: 'farms', pathMatch: 'full' },
    { path: 'farms',  component: HomeComponent },
    { path: 'farms/:code', component: FarmDetailsComponent },
    { path: 'farms/edit/:code', component: FarmDetailsEditComponent },
    { path: 'miller/:code', component: MillerDetailsComponent },
    { path: 'add-farm', component: FarmAddComponent }
];
 
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}