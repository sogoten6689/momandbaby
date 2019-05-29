import { ApiResult } from '../api-result';
import {RoomChatPaging} from '../../view-model/chat/roomChat-paging';

export class GetRoomsChatApiResult extends ApiResult {
  data: RoomChatPaging;
}
