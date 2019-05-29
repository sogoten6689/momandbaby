import { ApiResult } from '../api-result';
import {RoomChat} from '../../view-model/chat/roomChat';

export class RoomChatApiResult extends ApiResult {
  data: RoomChat;
}
