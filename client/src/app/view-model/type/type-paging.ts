import { Type } from 'class-transformer';

import { Paging } from '../paging';
import {Category} from './category';

export class TypePaging extends Paging {
  @Type(() => Category)
  Items: Category[];
}
