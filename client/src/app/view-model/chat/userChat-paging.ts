import { Type } from 'class-transformer';

import { Paging } from '../paging';
import {UserChat} from './userChat';

export class UserChatPaging extends Paging {
  @Type(() => UserChat)
  Items: UserChat[];
}
