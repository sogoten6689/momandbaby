import { Type } from 'class-transformer';

import { Paging } from '../paging';
import {RoomChat} from './roomChat';

export class RoomChatPaging extends Paging {
  @Type(() => RoomChat)
  Items: RoomChat[];
}
