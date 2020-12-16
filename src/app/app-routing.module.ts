import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RoomComponent } from './room/room.component';
import { JoinComponent } from './join/join.component';


const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "room/:id", component: RoomComponent },
  { path: "room/:id/join", component: JoinComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
