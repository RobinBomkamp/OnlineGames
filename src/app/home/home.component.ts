import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RoomModel } from '../model/room.model';
import { UserModel } from '../model/user.model';
import { UserService } from '../services/user.service';
import { RoomService } from '../services/room.service';
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
    private roomService: RoomService,
    private navigation: NavigationService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.homeForm = this.fb.group(new RoomModel());
  }

  submit(): void {
    let room = this.homeForm.value as RoomModel;
    this.userService.saveUser(room.host);
    let id = this.roomService.create(room);
    this.navigation.toRoom(id);
  }
}
