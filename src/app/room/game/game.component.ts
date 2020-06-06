import { Component, OnInit, Input } from '@angular/core';
import { UserModel } from 'src/app/model/user.model';
import { RoomModel } from 'src/app/model/room.model';
import { RoomService } from 'src/app/services/room.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  @Input() users: UserModel[];
  @Input() room: RoomModel;

  places = ["Bank", "Botschaft", "Casino", "Hotel", "Polarstation", "Supermarkt", "Firmenfeier", "Militärbasis", "Schule", "Universität", "Wellness-Tempel", "Strand", "Piratenschiff", "Weltraumstation", "Flugzeug", "Dampflokomotive", "Filmstudio", "Krankenhaus", "Kreuzfahrtschiff", 
    "Polizeistation", "Restaurant", "U-Boot", "Theater", "Werkstatt", "Zirkus"];

  constructor(
    private roomService: RoomService,
    public userService: UserService
  ) { }

  ngOnInit(): void {
  }

  async startGame() {
    let activePlace = Math.floor(Math.random() * Math.floor(this.places.length));    
    let userIndex = Math.floor(Math.random() * Math.floor(this.users.length));
    let agentName = this.users[userIndex].name;

    await this.roomService.setGame(this.room, agentName, activePlace);
  }
}
