export class JobsToUserModel {
    job: string;
    user: string;
}

export class RoomModel {
    id: string = null;
    name: string = "" ;
    password: string = "";

    host: string = "";

    agentName: string = "";
    activePlace: number = -1;

    state: number = 1;
    activeCategory: number = 0;
    activeQuestion: number = 0;

    // jobs: JobsToUserModel[] = [];
}