import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { RoomModel, TeamModel } from '../model/room.model';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private roomSelector: string = "rooms";
  private teamsSelector: string = "teams";
  private roomsCollection: AngularFirestoreCollection<RoomModel>;
  private currentRoomSelector: string = "online-games-current-room";

  constructor(
    private firestore: AngularFirestore
  ) {
    this.roomsCollection = this.firestore.collection<RoomModel>(this.roomSelector);
  }

  createTeams(room: RoomModel) {
    for (let index = 1; index < 5; index++) {
      let team = {
        name: "Team " + index
      } as TeamModel;
      this.createTeam(room, team);
    }
  }

  private createTeam(room: RoomModel, team: TeamModel) {
    team.id = this.firestore.createId();
    let teams = this.roomsCollection.doc(room.id).collection<TeamModel>(this.teamsSelector);
    return teams.doc(team.id).set(team);
  }

  getTeamsFromRoom(room: RoomModel): Observable<TeamModel[]> {
    return this.roomsCollection.doc<RoomModel>(room.id).collection<TeamModel>(this.teamsSelector).valueChanges();
  }

}
