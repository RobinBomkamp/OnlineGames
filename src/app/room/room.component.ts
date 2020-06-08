import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { RoomModel, JobsToUserModel } from '../model/room.model';
import { RoomService } from '../services/room.service';
import { switchMap, map } from "rxjs/operators";
import { UserModel } from '../model/user.model';
import { UserService } from '../services/user.service';
import { Clipboard } from "@angular/cdk/clipboard";
import { NavigationService } from '../services/navigation.service';

class ObservedData {
  room: RoomModel;
  users: UserModel[];
  jobs: JobsToUserModel[];
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
    private clipboard: Clipboard,
    private navigation: NavigationService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");
    this.room$ = this.roomService.get(this.id);
    this.users$ = this.room$.pipe(
      switchMap(room => {
        return this.roomService.getUsersFromRoom(room);
      })
    );
    let jobs$ = this.room$.pipe(
      switchMap(room => {
        return this.roomService.getJobsToUsersFromRoom(room);
      })
    )

    this.data$ = combineLatest(this.room$, this.users$, jobs$).pipe(
      map(([room, users, jobs]) => {
        this.roomService.saveRoom(room.id);
        return {
          room: room,
          users: users,
          jobs: jobs
        } as ObservedData
      })
    );
  }

  copyInvitationLink(): void {    
    let url = window.location.href;
    if (!url.endsWith("/")) {
      url += "/";
    }
    url += "join";
    this.clipboard.copy(url);
  }

  leaveRoom(): void {
    this.roomService.deleteRoom();
    this.navigation.toHome();
  }
}
