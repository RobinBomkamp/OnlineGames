import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoomModel, JobsToUserModel } from '../model/room.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { UserModel } from '../model/user.model';
import { MdcSnackbar } from '@angular-mdc/web';
import { take, switchMap } from 'rxjs/operators';
import { TeamService } from './team.service';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private roomSelector: string = "rooms";
  private usersSelector: string = "users";
  private roomsCollection: AngularFirestoreCollection<RoomModel>;
  private currentRoomSelector: string = "online-games-current-room";

  constructor(
    private firestore: AngularFirestore,
    private snackbar: MdcSnackbar,
    private teamsService: TeamService
  ) {
    this.roomsCollection = this.firestore.collection<RoomModel>(this.roomSelector);
  }

  get(id: string): Observable<RoomModel> {
    return this.roomsCollection.doc<RoomModel>(id).valueChanges();
  }

  create(room: RoomModel): string {
    const id = this.firestore.createId();
    room.id = id;
    this.roomsCollection.doc(id).set(room);
    this.addUserInternal(id, { name: room.host } as UserModel);
    let jobs = this.roomsCollection.doc(id).collection<JobsToUserModel>("jobs");
    this.teamsService.createTeams(room);
    return id;
  }

  addUser(room: RoomModel, user: UserModel, password: string): Observable<any> {
    if (room.password !== password) {
      this.snackbar.open("Wrong password.")
      return;
    }

    return this.getUsersFromRoom(room).pipe(
      take(1),
      switchMap(users => {
        if (users.some(x => x.name === user.name)) {
          this.snackbar.open("Username already assigned to other user.")
          return;
        }
        return this.addUserInternal(room.id, user);
      })
    );
  }

  setRoom(room: RoomModel) {
    this.roomsCollection.doc(room.id).set(room);
  }

  private addUserInternal(id: string, user: UserModel): Promise<any> {
    user.id = this.firestore.createId();
    let users = this.roomsCollection.doc(id).collection<UserModel>("users");
    return users.doc(user.id).set(user);
  }

  getUsersFromRoom(room: RoomModel): Observable<UserModel[]> {
    return this.roomsCollection.doc<RoomModel>(room.id).collection<UserModel>(this.usersSelector).valueChanges();
  }
  
  getJobsToUsersFromRoom(room: RoomModel): Observable<JobsToUserModel[]> {
    return this.roomsCollection.doc<RoomModel>(room.id).collection<JobsToUserModel>("jobs").valueChanges();
  }

 setGame(room: RoomModel, agentName: string, activePlace: number, jobsToUsers: JobsToUserModel[]): Promise<any> {
    room.agentName = agentName;
    room.activePlace = activePlace;
    return this.roomsCollection.doc(room.id).set(room).then(() => {
      let jobs = this.roomsCollection.doc(room.id).collection<JobsToUserModel>("jobs");
      
      for (const jobsToUser of jobsToUsers) {
        jobs.doc(this.firestore.createId()).set(jobsToUser);
      }
    });
  }

  saveRoom(roomId: string) {
    localStorage.setItem(this.currentRoomSelector, roomId);
  }

  getRoom(): string {
    let result = localStorage.getItem(this.currentRoomSelector);
    return result !== null && result !== undefined && result !== "" ? result : "";
  }

  deleteRoom(): void {
    localStorage.removeItem(this.currentRoomSelector);
  }
}
