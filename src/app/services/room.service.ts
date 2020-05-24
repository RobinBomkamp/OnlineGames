import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoomModel } from '../model/room.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private roomSelector: string = "rooms";
  private roomsCollection: AngularFirestoreCollection<RoomModel>;
  rooms$: Observable<RoomModel[]>;

  constructor(
    private firestore: AngularFirestore
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

  add(room: RoomModel): string {
    const id = this.firestore.createId();
    room.id = id;
    this.roomsCollection.doc(id).set(room);
    return id;
  }
}
