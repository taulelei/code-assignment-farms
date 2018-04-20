import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {AppRoutingModule} from './routing.module';
import {MainModule} from './main/main.module';

import {DataService} from './services/dataService.service';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule, 
    MainModule
  ],
  declarations: [
    AppComponent,
    MainComponent
  ],
  providers: [
    DataService
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
