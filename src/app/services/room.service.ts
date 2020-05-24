import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoomModel } from '../model/room.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { UserModel } from '../model/user.model';
import { MdcSnackbar } from '@angular-mdc/web';
import { take, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private roomSelector: string = "rooms";
  private usersSelector: string = "users";
  private roomsCollection: AngularFirestoreCollection<RoomModel>;
  rooms$: Observable<RoomModel[]>;

  constructor(
    private firestore: AngularFirestore,
    private snackbar: MdcSnackbar
  ) { 
    this.roomsCollection = this.firestore.collection<RoomModel>(this.roomSelector);
    this.rooms$ = this.roomsCollection.valueChanges();
  }

  getAll(): Observable<RoomModel[]> {
    return this.firestore.collection<RoomModel>(this.roomSelector).valueChanges();
  }

  get(id: string): Observable<RoomModel> {
    return this.roomsCollection.doc<RoomModel>(id).valueChanges();  
  }

  create(room: RoomModel): string {
    const id = this.firestore.createId();
    room.id = id;
    this.roomsCollection.doc(id).set(room);
    this.addUserInternal(id, {name: room.host} as UserModel);
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

  private addUserInternal(id: string, user: UserModel): Promise<any> {
    user.id = this.firestore.createId();
    let users = this.roomsCollection.doc(id).collection<UserModel>("users");
    return users.doc(user.id).set(user);
  }

  getUsersFromRoom(room: RoomModel): Observable<UserModel[]> {
    return this.roomsCollection.doc(room.id).collection<UserModel>(this.usersSelector).valueChanges();
  }
}
