import { Component, OnInit, Input } from '@angular/core';
import { UserModel } from 'src/app/model/user.model';
import { RoomModel, JobsToUserModel } from 'src/app/model/room.model';
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

  places = [
    { name: "Bank", jobs: ["Kassier", "Fililialleiter", "Analageberater", "Wachmann", "Räuber", "Kunde", "Versicherungsberater"] },
    { name: "Botschaft", jobs: ["Diplomat", "Sekeretär", "Chauffeur", "Flüchtling", "Botschafter", "Sicherheitsbeamter", "Tourist"] },
    { name: "Casino", jobs: ["Coupier", "Falschspieler", "Türsteher", "Sicherheitschef", "Spieler", "Dealer", "Barkeeper"] },
    { name: "Hotel", jobs: ["Rezeptionist", "Hotelgast", "Zimmermädchen", "Barkeeper", "Page", "Portier", "Hoteldirekor"] },
    { name: "Polarstation", jobs: ["Hydrologe", "Arzt", "Meteorologe", "Speditionsleiter", "Funker", "Biologe", "Geologe"] },
    { name: "Supermarkt", jobs: ["Praktikant", "Ladendetektiv", "Regalbetreuer", "Kassierer", "Kunde", "Fleischermeister", "Fillialleiter"] },
    { name: "Firmenfeier", jobs: ["Buchhalter", "Sekretärin", "Generaldirektor", "Abteilungsleiter", "Party-Crasher", "Bürodame", "DJ"] },
    { name: "Militärbasis", jobs: ["Wachposten", "Militärarzt", "Kantinenchef", "Oberst", "Gefreiter", "Unteroffizier", "Dessateur"] },
    { name: "Schule", jobs: ["Schulwart", "Klassensprecher", "Vertrauenslehrer", "Turnlehrer", "Schulinspektor", "Schuldirektor", "Schüler"] },
    { name: "Universität", jobs: ["Dekan", "Psychologe", "Studienberater", "Bibliothekar", "Student", "Professor", "Tutor"] },
    { name: "Wellness-Tempel", jobs: ["Friseur", "Stylist", "Kosmetiker", "Nageldesigner", "Gast", "Masseur", "Reinigungskraft"] },
    { name: "Strand", jobs: ["Dieb", "ANNImateur", "Taucher", "Strandverkäufer", "Urlauber", "Surfer", "Rettungsschwimmer"] },
    { name: "Piratenschiff", jobs: ["Koch", "Schiffsjunge", "Geschützoffizier", "Gefangener", "Steuermann", "Kapitän", "Botsmann"] },
    { name: "Weltraumstation", jobs: ["Bordingeneur", "IT-Techniker", "Kosmonaut", "Arzt", "Weltraumtourist", "Wissenschaftler", "Außerirdischer"] },
    { name: "Flugzeug", jobs: ["Flugingenuer", "Blinder", "Passagier", "Pilot", "Copilot", "Passagier erster Klasse", "Fluggast", "Flugbegleiter"] },
    { name: "Dampflokomotive", jobs: ["Grenzposten", "Fahrgast", "Speisewagenbegleiter", "Schwarzfahrer", "Heizer", "Lokführer", "Schaffner"] },
    { name: "Filmstudio", jobs: ["Regisseur", "Statist", "Kameramann", "Tontechniker", "Kostümdesigner", "Schauspieler", "Stuntman"] },
    { name: "Krankenhaus", jobs: ["Internist", "Krankenschwester", "Assistenrarzt", "Pfleger", "Pathologe", "Patient", "Chirurg"] },
    { name: "Kreuzfahrtschiff", jobs: ["Matrose", "Passagier", "Musiker", "Barkeeper", "Kapitän", "Stewart", "Reiseleiter"] },
    { name: "Polizeistation", jobs: ["Archivar", "Strafverteidiger", "Ermittler", "Pressesprecher", "Kriminalbeamter", "Polizist", "Gefagener"] },
    { name: "Restaurant", jobs: ["Sommelier", "Kellner", "Gast", "Restaurantkritiker", "Küchenhilfe", "Restaurantleier", "Pianist"] },
    { name: "U-Boot", jobs: ["Maschinenarbeiter", "Elektriker", "Funker", "Admiral", "Matrose", "Koch", "Navigationsoffizier"] },
    { name: "Theater", jobs: ["Souffleur", "Platzeinweiser", "Schauspieler", "Zuschauer", "Bühnenarbeiter", "Gaderobier", "Theaterdirektor", ] },
    { name: "Werkstatt", jobs: ["Autofahrer", "Servicetechniker", "Geschäftsführer", "Empfangsdame", "Praktikant", "Motorradfahrer", "KFZ-Mechaniker"] },
    { name: "Zirkus", jobs: ["Zauberer", "Clown", "Messerwerfer", "Feuerschlucker", "Hochseilakrobat", "Domteur", "Jongleur"] },
  ];

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

    let jobs = [];
    let jobsToUsers = [];
    for (const user of this.users) {
      if (jobs.length === 0) {
        jobs = this.places[activePlace].jobs
      }
      let index = Math.floor(Math.random() * Math.floor(jobs.length))
      let job = jobs[index];
      jobs.slice(index, 1);

      jobsToUsers.push({
        user: user.name,
        job: job
      } as JobsToUserModel)
    }

    await this.roomService.setGame(this.room, agentName, activePlace, jobsToUsers);
  }

  isAgent(): boolean {
    return this.userService.getUser() === this.room.agentName;
  }

  getJob(): string {
    if (!this.room.jobs) {
      return ""; 
    }
    let job = this.room.jobs.find(x => x.user === this.userService.getUser()).job
    return job !== undefined && job !== null ? job : "";
  }
}
