import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { first, map, take, tap } from 'rxjs/operators';
import { RoomModel, TeamModel } from '../model/room.model';
import { UserModel } from '../model/user.model';

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
        name: "Team " + index,
        members: []
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

  private getAllTeams(room: RoomModel): Observable<TeamModel[]> {
    return this.roomsCollection.doc<RoomModel>(room.id)
      .collection(this.teamsSelector)
      .snapshotChanges()
      .pipe(
        map((snaps) =>
          snaps.map((snap) => {
            return {
              id: snap.payload.doc.id,
              ...(snap.payload.doc.data() as TeamModel),
            };
          }),
        ),
        take(1),
        first(),
        tap(console.log),
      );
  }

  addUser(room: RoomModel, user: UserModel) {
    this.getAllTeams(room).subscribe(teams => {
      teams.sort((a, b) => {
        if (a.members.length < b.members.length) return -1;
        else if (a.members.length > b.members.length) return 1;
        else return 0;
      });

      let teamsNew = this.roomsCollection.doc(room.id).collection<TeamModel>(this.teamsSelector);
      let team = teams[0];
      if (!team.members) {
        team.members = [];
      }
      team.members.push(user);
      teamsNew.doc(team.id).set(team);
    });
  }

}
