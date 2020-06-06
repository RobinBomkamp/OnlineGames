import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { RoomModel } from '../model/room.model';
import { RoomService } from '../services/room.service';
import { switchMap, map } from "rxjs/operators";
import { UserModel } from '../model/user.model';
import { UserService } from '../services/user.service';
import { Clipboard } from "@angular/cdk/clipboard";

class ObservedData {
  room: RoomModel;
  users: UserModel[];
}

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  destinations = [
    { label: 'Inbox', icon: 'inbox', activated: true },
    { label: 'Star', icon: 'star', activated: false },
    { label: 'Sent Mail', icon: 'send', activated: false },
    { label: 'Drafts', icon: 'drafts', activated: false }
  ];

  id: string;
  room$: Observable<RoomModel>;
  users$: Observable<UserModel[]>;
  data$: Observable<ObservedData>;

  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService,
    public userService: UserService,
    private clipboard: Clipboard
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");
    this.room$ = this.roomService.get(this.id);
    this.users$ = this.room$.pipe(
      switchMap(room => {
        return this.roomService.getUsersFromRoom(room);
      })
    );

    this.data$ = combineLatest(this.room$, this.users$).pipe(
      map(([room, users]) => {
        return {
          room: room,
          users: users
        } as ObservedData
      })
    )
  }

  copyInvitationLink(): void {    
    let url = window.location.href;
    if (!url.endsWith("/")) {
      url += "/";
    }
    url += "join";
    this.clipboard.copy(url);
  }
}
