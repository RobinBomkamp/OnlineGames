import { Component, Input, OnInit } from '@angular/core';
import { TeamModel } from 'src/app/model/room.model';
import { UserModel } from 'src/app/model/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  @Input() active: boolean;
  @Input() showResults: boolean;
  @Input() team: TeamModel = new TeamModel();

  get showKnowledge(): boolean {
    return this.showResults || this.currentUserIsInMembers();
  }

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  private currentUserIsInMembers(): boolean {
    return this.team.members.findIndex(x => x.name === this.userService.getUser()) > -1;
  }

}
