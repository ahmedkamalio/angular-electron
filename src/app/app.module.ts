
// -- Module dependencies --

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgxElectronModule } from 'ngx-electron';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxElectronModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
