import { ApiResult } from '../api-result';
import {UserChatPaging} from '../../view-model/chat/userChat-paging';

export class GetUsersChatApiResult extends ApiResult {
  data: UserChatPaging;
}
