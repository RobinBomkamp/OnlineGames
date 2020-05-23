import { UserModel } from './user.model';

export class RoomModel {
    id: string = null;
    name: string = "" ;
    password: string = "";

    users: UserModel[] = [];    
}