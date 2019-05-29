import { Type } from 'class-transformer';
import { Paging } from '../paging';
import {UserResModel} from './user-res-model';

export class UserPaging extends Paging {
  Items: UserResModel[];
}
