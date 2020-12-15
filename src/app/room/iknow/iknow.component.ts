import { MdcCheckbox, MdcRadio } from '@angular-mdc/web';
import { AfterViewInit, Component, Input, OnChanges, OnInit, QueryList, SimpleChange, SimpleChanges, ViewChildren } from '@angular/core';
import { CategoryModel, QuestionModel } from 'src/app/model/categories.model';
import { TeamModel } from 'src/app/model/room.model';
import { QuestionService } from 'src/app/services/question.service';
import { RoomService } from 'src/app/services/room.service';
import { ObservedData } from "../room.component";

@Component({
  selector: 'app-iknow',
  templateUrl: './iknow.component.html',
  styleUrls: ['./iknow.component.scss']
})
export class IknowComponent implements OnInit {

  @Input() data: ObservedData;

  members = [ "Hans", "Dieter", "Franz"];


  categories: CategoryModel[];

  
  get answeringQuestions() : boolean {
    return this.data.room.state === 1;
  }
  get showKnowledge() : boolean {
    return this.data.room.state === 2;
  }
  get showResults() : boolean {
    return this.data.room.state >= 3;
  }
  get showCorrectResult() : boolean {
    return this.data.room.state >= 4;
  }
  get showPercentage() : boolean {
    return this.data.room.state === 5;
  }

  constructor(
    private questionService: QuestionService,
    private roomService: RoomService
  ) { }

  ngOnInit(): void {
    this.categories = this.questionService.getAllCategories();
  }

  activeQuestion(): QuestionModel {
    return this.categories[this.data.room.activeCategory].questions[this.data.room.activeQuestion];
  }

  next() {
    this.data.room.state++;
    if (this.data.room.state >= 6) {
      this.data.room.activeCategory++;
      this.data.room.state = 0;
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
}
