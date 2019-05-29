import { ApiResult } from '../api-result';
import {UserPaging} from '../../view-model/user/user-paging';
import {UserResModel} from '../../view-model/user/user-res-model';
export class GetUsersApiResult extends ApiResult {
  data: UserResModel[];
}
