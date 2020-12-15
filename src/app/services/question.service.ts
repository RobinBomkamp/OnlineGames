import { Injectable } from '@angular/core';
import { CategoryModel, QuestionModel } from '../model/categories.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  
  getAllCategories(): CategoryModel[] {
    return [
      {
        name: "Unsere Heimat",
        questions: [
          {
            question: "Dies ist ein kleiner Test?",
            answer1: "Antwort 1",
            answer2: "Antwort 2",
            answer3: "Antwort 3",
            answer4: "Antwort 4",
            correct: 3
          } as QuestionModel,
          {
            question: "Dies ist ein kleiner Test?2",
            answer1: "Antwort 1",
            answer2: "Antwort 2",
            answer3: "Antwort 3",
            answer4: "Antwort 4",
            correct: 3
          } as QuestionModel
        ]
      } as CategoryModel,
      {
        name: "Die wunderbare Welt der Tiere",
        questions: [
          {
            question: "Frage 2",
            answer1: "Nicht 1",
            answer2: "Nicht 2",
            answer3: "Nicht 3",
            answer4: "Doch 4",
            correct: 4
          } as QuestionModel,
          {
            question: "Frage 22",
            answer1: "Nicht 1",
            answer2: "Nicht 2",
            answer3: "Nicht 3",
            answer4: "Doch 4",
            correct: 4
          } as QuestionModel
        ]
      } as CategoryModel
    ];
  }
}
