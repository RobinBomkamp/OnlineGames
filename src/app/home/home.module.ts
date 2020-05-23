import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';



@NgModule({
  entryComponents: [HomeComponent],
  declarations: [HomeComponent],
  imports: [
    CommonModule
  ],
  exports: [ HomeComponent ]
})
export class HomeModule { }
