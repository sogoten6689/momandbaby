import { ApiResult} from "../../data-transfer/api-result";
import {UserResModel} from './user-res-model';

export class UserApiResult extends  ApiResult{
  data: UserResModel
}
