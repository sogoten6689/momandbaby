import { ApiResult } from '../api-result';
import {UserChat} from '../../view-model/chat/userChat';

export class UserChatApiResult extends ApiResult {
  data: UserChat;
}
