import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// import {DataService} from '../services/dataService.service';

import { HomeComponent } from './home/home.component';
import { FarmDetailsComponent } from './farm_details/farmDetails.component';
import { RouterModule } from '@angular/router';


@NgModule({
    declarations: [
        HomeComponent,
        FarmDetailsComponent
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
