import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { RoomModel } from '../model/room.model';
import { RoomService } from '../services/room.service';
import { tap } from "rxjs/operators";

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  id: string;
  room$: Observable<RoomModel>;

  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");
    this.room$ = this.roomService.get(this.id).pipe(
      tap(console.log)
    );
  }

}
