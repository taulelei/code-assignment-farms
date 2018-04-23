import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// import {DataService} from '../services/dataService.service';

import { HomeComponent } from './home/home.component';
import { FarmDetailsComponent } from './farm_details/farmDetails.component';
import { FarmDetailsEditComponent } from './farm_details_edit/farmDetailsEdit.component';
import { RouterModule } from '@angular/router';
import { MillerDetailsComponent } from './miller_details/millerDetails.component';


@NgModule({
    declarations: [
        HomeComponent,
        FarmDetailsComponent,
        FarmDetailsEditComponent,
        MillerDetailsComponent
    ],

    entryComponents:[
    ],

    imports: [
        BrowserModule,
        FormsModule,
        CommonModule,
        NgbModule,
        RouterModule
    ],

    exports: [],
  
    providers: [
        // DataService
    ],

})
export class MainModule {}
