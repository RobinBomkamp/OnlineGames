import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MdcFormFieldModule, MdcTextFieldModule, MdcButtonModule, MdcCardModule } from "@angular-mdc/web";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,

    MdcFormFieldModule,
    MdcTextFieldModule,
    MdcButtonModule,
    MdcCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
