import {Injectable} from '@angular/core';
import {APIService} from "./api.service";
import {HttpClient} from "@angular/common/http";
import {SpinService} from "./spin.service";
import {GetUsersChatApiResult} from '../data-transfer/chat/getUsersChat.api-result';
import {GetRoomsChatApiResult} from '../data-transfer/chat/getRoomsChat.api-result';
import {RoomChatApiResult} from "../data-transfer/chat/roomChat.api-result";

@Injectable()
export class ChatService extends APIService {

  constructor(private http: HttpClient, private spintService: SpinService) {
    super(http, spintService);
  }

  public getListUser() {
    return super.apiGet<GetUsersChatApiResult>('/chat/getListUsers', null, false);
  }

  public getListRoom() {
    return super.apiGet<GetRoomsChatApiResult>('/chat/getListRoom', null, false);
  }
  public getListRoomOfUser(userId:String) {
    return super.apiGet<GetRoomsChatApiResult>('/chat/getListRoomOfUser/'+userId,null, false);
  }
  public  createRoom(userId: string, name: string, lstUserId: Array<string> ){
    return super.apiPost<RoomChatApiResult>('/chat/createRoom', {userId, name, lstUserId},null,true);
  }

}
