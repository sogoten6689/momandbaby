import { Type } from 'class-transformer';

import { Paging } from '../paging';
import {Topic} from './topic';

export class TopicPaging extends Paging {
  @Type(() => Topic)
  Items: Topic[];
}
