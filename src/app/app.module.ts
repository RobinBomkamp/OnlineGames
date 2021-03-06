import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MdcFormFieldModule, MdcTextFieldModule, MdcButtonModule, MdcCardModule, MdcIconModule, MdcTopAppBarModule, MdcDrawerModule, MdcListModule, MdcTypographyModule, MdcSnackbarModule, MdcImageListModule, MdcCheckboxModule, MdcRadioModule, MdcLinearProgressModule } from "@angular-mdc/web";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { RoomComponent } from './room/room.component';
import { JoinComponent } from './join/join.component';
import { GameComponent } from './room/game/game.component';
import { IknowComponent } from './room/iknow/iknow.component';
import { TeamComponent } from './room/iknow/team/team.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RoomComponent,
    JoinComponent,
    GameComponent,
    IknowComponent,
    TeamComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,

    MdcFormFieldModule,
    MdcTextFieldModule,
    MdcButtonModule,
    MdcCardModule,
    MdcIconModule,
    MdcTopAppBarModule,
    MdcDrawerModule,
    MdcListModule,
    MdcTypographyModule,
    MdcSnackbarModule,
    MdcImageListModule,
    MdcCheckboxModule,
    MdcRadioModule,
    MdcLinearProgressModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
