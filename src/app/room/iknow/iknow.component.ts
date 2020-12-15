import { Component, Input, OnInit } from '@angular/core';
import { CategoryModel, QuestionModel } from 'src/app/model/categories.model';
import { TeamModel } from 'src/app/model/room.model';
import { AnswerService } from 'src/app/services/answer.service';
import { QuestionService } from 'src/app/services/question.service';
import { RoomService } from 'src/app/services/room.service';
import { TeamService } from 'src/app/services/team.service';
import { UserService } from 'src/app/services/user.service';
import { ObservedData } from "../room.component";

@Component({
  selector: 'app-iknow',
  templateUrl: './iknow.component.html',
  styleUrls: ['./iknow.component.scss']
})
export class IknowComponent implements OnInit {

  @Input() 
  get data(): ObservedData { return this._data; }
  set data(v: ObservedData) {
    this._data = v;
    if (v.room.state === 0) {
      this.activeAnswer = 0;
      this.allAnswers = null;
    }
    if (this.showKnowledge && this.getTeams().indexOf(this.getTeamOfUser()) === this.data.room.activeQuestion) {
      this.knowledge(true);
    }
    if (this.showPercentage && !this.allAnswers) {
      this.getAllResults();
    }
  }
  private _data: ObservedData;

  activeAnswer = 0;
  answers = [1, 2, 3, 4];

  allAnswers: number[] = null;

  categories: CategoryModel[];
  
  get answeringQuestions() : boolean {
    return this.data.room.state === 1;
  }
  get showKnowledge() : boolean {
    return this.data.room.state === 2;
  }
  get getAnswerFromTeam() : boolean {
    return this.data.room.state >= 3;
  }
  get showCorrectResult() : boolean {
    return this.data.room.state >= 4;
  }
  get showResults() : boolean {
    return this.data.room.state >= 5;
  }
  get showPercentage() : boolean {
    return this.data.room.state === 6;
  }

  constructor(
    private questionService: QuestionService,
    private roomService: RoomService,
    public answerService: AnswerService,
    public userService: UserService,
    private teamService: TeamService
  ) { }

  ngOnInit(): void {
    this.categories = this.questionService.getAllCategories();
  }

  activeQuestion(): QuestionModel {
    return this.categories[this.data.room.activeCategory].questions[this.data.room.activeQuestion];
  }

  next() {
    this.data.room.state++;
    if (this.data.room.state >= 7) {
      this.data.room.activeCategory++;
      this.data.room.state = 0;
      this.data.room.activeAnswer = 0;
      this.activeAnswer = 0;
      if (this.data.room.activeCategory > this.categories.length - 1) {
        this.data.room.activeCategory = 0;
        this.data.room.activeQuestion++;
        if (this.data.room.activeQuestion > this.categories[this.data.room.activeCategory].questions.length - 1) {
          this.data.room.activeQuestion = this.categories[this.data.room.activeCategory].questions.length - 1;
        }
      }
    }
    this.roomService.setRoom(this.data.room);
  }

  back() {
    this.data.room.state--;
    if (this.data.room.state < 0) {
      this.data.room.state = 0;
    }
    this.roomService.setRoom(this.data.room);
  }

  reset() {
    this.data.room.activeCategory = 0;
    this.data.room.activeQuestion = 0;
    this.data.room.state = 0;
    this.roomService.setRoom(this.data.room);
  }

  getTeams(): TeamModel[] {
    return this.data.teams.sort((a, b) => {
      if (a.name < b.name) return -1;
      else if (a.name > b.name) return 1;
      else return 0;
    })
  }

  answer(answer: number) {
    if (answer === this.activeAnswer) {
      return;
    }
    let user = this.data.users.find(x => x.name === this.userService.getUser());
    this.answerService.setAnswer(this.data.room, user, answer);
    this.activeAnswer = answer;
  }

  getTeamOfUser(): TeamModel {
    let user = this.data.users.find(x => x.name === this.userService.getUser());
    return this.data.teams.find(x => x.members.findIndex(y => y.name === user.name) > -1);
  }

  knowledge(value: boolean) {
    let team = this.getTeamOfUser();
    if (team.knowledge === value) {
      return;
    }
    team.knowledge = value;
    this.teamService.setTeam(this.data.room, team);
  }

  setAnswerFromTeam(answer: number) {
    if (this.data.room.activeAnswer === answer) {
      return;
    }
    this.data.room.activeAnswer = answer;
    this.roomService.setRoom(this.data.room);
  }

  isActiveAnswer(i: number): boolean {
    return (!this.getAnswerFromTeam && this.activeAnswer === i) || 
      (this.getAnswerFromTeam && this.data.room.activeAnswer === i);
  }

  isCorrectAnswer(i: number): boolean {
    return this.showCorrectResult && this.activeQuestion().correct === i;
  }

  getAllResults() {
    this.answerService.getAllAnswers(this.data.room).subscribe(answers => {
      this.allAnswers = answers;
      if (this.userService.getUser() === this.data.room.host) {
        this.givePoints(answers);
      }
    });
  }

  getProgress(answers: number[]): number {
    if (!answers) {
      return 0;
    }
    let correct = this.activeQuestion().correct;
    let totalCount = answers.length;
    let correctCount = answers.filter(x => x === correct).length;
    return correctCount / totalCount;
  }

  private givePoints(answers: number[]) {
    let points = this.getPoints(answers);
    let answeredCorrectly = this.data.room.activeAnswer === this.activeQuestion().correct;
    let correctTeams = this.data.teams.filter(x => x.knowledge === answeredCorrectly);
    for (const correctTeam of correctTeams) {
      this.setPointsForTeam(correctTeam, points);
    }
  }

  getPoints(answers: number[]) {
    let progress = this.getProgress(answers);
    if (progress < 0.25) {
      return  5;
    } else if (progress < 0.45) {
      return 4;
    } else if (progress < 0.65) {
      return 3;
    } else if (progress < 0.85) {
      return 2;
    } 
    return 1;
  }

  private setPointsForTeam(team: TeamModel, points: number) {
    team.points += points;
    this.teamService.setTeam(this.data.room, team)
  }
}
