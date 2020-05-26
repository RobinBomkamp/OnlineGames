import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../services/user.service';
import { RoomService } from '../services/room.service';
import { NavigationService } from '../services/navigation.service';
import { RoomModel } from '../model/room.model';
import { UserModel } from '../model/user.model';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss']
})
export class JoinComponent implements OnInit {

  homeForm: FormGroup;
  room$: Observable<RoomModel>;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private roomService: RoomService,
    private navigation: NavigationService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.homeForm = this.fb.group({
      room: this.fb.group(new RoomModel()),
      user: this.fb.group(new UserModel())
    });

    let id = this.route.snapshot.paramMap.get("id");

    this.room$ = this.roomService.get(id);
  }

  submit(room: RoomModel): void {
    let formRoom = this.homeForm.get("room").value as RoomModel;

    let user = this.homeForm.get("user").value as UserModel;
    this.userService.saveUser(user.name);
    this.roomService.addUser(room, user, formRoom.password).subscribe(() => {
      this.navigation.toRoom(room.id);
    });
  }

}
