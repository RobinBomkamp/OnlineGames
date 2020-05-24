import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RoomModel } from '../model/room.model';
import { UserModel } from '../model/user.model';
import { UserService } from '../services/user.service';
import { RoomService } from '../services/room.service';
import { Router } from '@angular/router';
import { NavigationService } from '../services/navigation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  homeForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private roomService: RoomService,
    private navigation: NavigationService
  ) { }

  ngOnInit(): void {
    this.homeForm = this.fb.group({
      room: this.fb.group(new RoomModel()),
      user: this.fb.group(new UserModel())
    });
  }

  submit(): void {
    let user = this.userService.create(this.homeForm.get("user").value as UserModel)
    let room = this.homeForm.get("room").value as RoomModel;
    room.users = [ user ];
    let id = this.roomService.add(room);

    this.navigation.toRoom(id);
  }
}
