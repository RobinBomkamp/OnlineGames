import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { RoomModel } from '../model/room.model';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private roomSelector: string = "rooms";
  private roomRef: AngularFireList<RoomModel>;

  constructor(
    private db: AngularFireDatabase
  ) { 
    this.roomRef = this.db.list(this.roomSelector);
  }

  get(): Observable<RoomModel[]> {    
    return this.db.list(this.roomSelector).valueChanges() as Observable<RoomModel[]>;
  }

  add(room: RoomModel) {
    this.roomRef.push(room);
    this.roomRef.snapshotChanges().subscribe(console.log);
  }
}
