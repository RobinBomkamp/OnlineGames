import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, EMPTY } from 'rxjs';
import { RoomModel } from '../model/room.model';
import { UUID } from 'angular2-uuid';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private roomSelector: string = "rooms";

  constructor(
    private firestore: AngularFirestore
  ) { }

  get(): Observable<RoomModel[]> {
    this.firestore.collection(this.roomSelector).get();
    return EMPTY;
  }

  add(room: RoomModel) {
    if (!room.id) {
      room.id = UUID.UUID();
    }
    this.firestore.collection(this.roomSelector).add(room);
  }   
}
