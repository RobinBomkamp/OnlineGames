import { Injectable } from '@angular/core';
import { CategoryModel, QuestionModel } from '../model/categories.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  
  getAllCategories(): CategoryModel[] {
    return [
      {
        name: "Auf einen Blick hinter die Kulissen",
        questions: [
          {
            question: 'Aus welchem Film stammt das Zitat: "Der Winter ist schön und ich lieb’ meine Mütze, doch wär’ endlich Sommer dann würd’ ich zur…Strandbar gehen."?',
            answer1: "Pets",
            answer2: "Die Eiskönigin",
            answer3: "Vaiana",
            answer4: "Die Unglaublichen",
            correct: 2
          } as QuestionModel,
          {
            question: 'Wer ist der Hauptdarsteller im Film "Schindlers Liste"?',
            answer1: "Liam Neeson",
            answer2: "Ben Kingsley",
            answer3: "Robert Fox",
            answer4: "Hugh Grant",
            correct: 1
          } as QuestionModel,
          {
            question: 'Welcher Film gewann 1998 den Oscar für das beste Kostümdesign unter anderem wegen seiner historisch genauen Umsetzung?',
            answer1: "Shakespeare in Love",
            answer2: "Titanic",
            answer3: "Der Soldat James Ryan",
            answer4: "Good Will Hunting",
            correct: 2
          } as QuestionModel,
          {
            question: 'Welche der folgenden Filmfiguren war ursprünglich kein Disney Prinzessin?',
            answer1: "Cinderella",
            answer2: "Anastasia",
            answer3: "Jasmin",
            answer4: "Belle",
            correct: 2
          } as QuestionModel
        ]
      } as CategoryModel,
      {
        name: "Wolles Werkzeugkasten",
        questions: [
          {
            question: 'Welches Werkzeug gibt es wirklich?',
            answer1: "Bogenschnur",
            answer2: "Gewindehammer",
            answer3: "Siemens-Lufthaken",
            answer4: "Böschungshobel",
            correct: 4
          } as QuestionModel,
          {
            question: 'Der Zapfenlochbohrer ermöglicht das Bohren von Löchern welcher Form?',
            answer1: "Dreieck",
            answer2: "6-zackiger Stern",
            answer3: "Quadrat",
            answer4: "Halbkreis",
            correct: 3
          } as QuestionModel,
          {
            question: 'Aus welchem Handwerk stammt die Redewendung „blau machen“?',
            answer1: "Maler",
            answer2: "Färber",
            answer3: "Winzer",
            answer4: "Bootsbauer",
            correct: 2
          } as QuestionModel,
          {
            question: 'Wenn der Japaner eine Holzoberfläche vor Witterung schützen möchte, wendet er dabei die Yakisugi-Methode an. Was tut er dabei genau?',
            answer1: "wässern",
            answer2: "lackieren",
            answer3: "ein Zinnblech anbringen",
            answer4: "verbrennen",
            correct: 4
          } as QuestionModel
        ]
      } as CategoryModel,
      {
        name: "Mode, Geschichte und Glitzerkram",
        questions: [
          {
            question: 'Welches Element inspirierte das Diadem, das Fürst Albert II., Prinz von Monaco, für seine Frau als Hochzeitsgeschenk anfertigen ließ?',
            answer1: "Feuer",
            answer2: "Wasser",
            answer3: "Erde",
            answer4: "Luft",
            correct: 2
          } as QuestionModel,
          {
            question: 'Welcher dieser (Halb-)Edelsteine verliert durch Berührung mit Salz sein charakteristisches Schimmern?',
            answer1: "Labradorith",
            answer2: "Mondstein",
            answer3: "Opal",
            answer4: "Goldfluss",
            correct: 3
          } as QuestionModel,
          {
            question: 'Welches Mitglied der englischen Königsfamilie begründete die Tradition des weißen Hochzeitskleides?',
            answer1: "Queen Victoria",
            answer2: "King Henry VIII",
            answer3: "Queen Elizabeth II",
            answer4: "Princess Eugenie",
            correct: 1
          } as QuestionModel,
          {
            question: 'Die Rationierung im 2. Weltkrieg führte dazu, dass Frauen sich welches Körperteil schminkten?',
            answer1: "Beine",
            answer2: "Handgelenke",
            answer3: "Ohrläppchen",
            answer4: "Augenbrauen",
            correct: 1
          } as QuestionModel
        ]
      } as CategoryModel,
      {
        name: "Unsere Pflanzen- und Tierwelt",
        questions: [
          {
            question: 'Was war das erste Tier in einer Umlaufbahn im All?',
            answer1: "Hund",
            answer2: "Katze",
            answer3: "Maus",
            answer4: "Schimpanse",
            correct: 1
          } as QuestionModel,
          {
            question: "Wasserrehe könnten auch wie genannt werden?",
            answer1: "Vampirbambis",
            answer2: "Kerzenleuchterhirsche",
            answer3: "Elefantenfußwild",
            answer4: "Werbock",
            correct: 1
          } as QuestionModel,
          {
            question: "Kapern sind?",
            answer1: "die Früchte eines Baume",
            answer2: "ein Gemüse",
            answer3: "Samen einer Gräserart",
            answer4: "Blütenknospen eines Strauches",
            correct: 4
          } as QuestionModel,
          {
            question: "Das größte Lebewesen der Erde ist?",
            answer1: "ein Blauwal",
            answer2: "ein Riesenmammutbaum im Yosemite Nationalpark",
            answer3: "ein Hallimasch-Pilz",
            answer4: "Lebermoos zum Ende der Kreidezeit nachgewiesen",
            correct: 3
          } as QuestionModel
        ]
      } as CategoryModel,
      {
        name: "Winter Wonderland",
        questions: [
          {
            question: 'Was hat der Großvater im TV-Weihnachts-Klassiker "Der kleine Lord" für einen Adelstitel?',
            answer1: "Earl of Grantham",
            answer2: "Earl of Essex",
            answer3: "Earl of Dorincort",
            answer4: "Earl of Sussex",
            correct: 3
          } as QuestionModel,
          {
            question: "Woher kommt die Nordmanntanne ursprünglich?",
            answer1: "Kaukasus",
            answer2: "Griechenland",
            answer3: "Indien",
            answer4: "Kanada",
            correct: 1
          } as QuestionModel,
          {
            question: "In welcher Stadt war der heilige Nikolaus Bischof?",
            answer1: "Konstantinopel",
            answer2: "Ephesus",
            answer3: "Myra",
            answer4: "Jerusalem",
            correct: 3
          } as QuestionModel,
          {
            question: "Warum mussten Maria und Josef nach Betlehem?",
            answer1: "Erbschaft",
            answer2: "Volkszählung",
            answer3: "neuer Arbeitsplatz",
            answer4: "Marktbesuch",
            correct: 3
          } as QuestionModel
        ]
      } as CategoryModel
    ];
  }
}
