import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { first, map, take } from 'rxjs/operators';
import { AnswerModel, RoomModel } from '../model/room.model';
import { UserModel } from '../model/user.model';


@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  private roomSelector: string = "rooms";
  private answersSelector: string = "answers";
  private roomsCollection: AngularFirestoreCollection<RoomModel>;
  private currentRoomSelector: string = "online-games-current-room";

  constructor(
    private firestore: AngularFirestore
  ) {
    this.roomsCollection = this.firestore.collection<RoomModel>(this.roomSelector);
  }

  setAnswer(room: RoomModel, user: UserModel, answer: number) {
    this.roomsCollection.doc<RoomModel>(room.id)
      .collection<AnswerModel>(this.answersSelector)
      .doc(user.id)
      .set({ value: answer } as AnswerModel)
  }


  getAllAnswers(room: RoomModel): Observable<number[]> {
    return this.roomsCollection.doc<RoomModel>(room.id)
      .collection(this.answersSelector)
      .snapshotChanges()
      .pipe(
        map((snaps) =>
          snaps.map((snap) => (snap.payload.doc.data() as any).value as number),
        ),
        take(1),
        first(),
      );
  }
}
