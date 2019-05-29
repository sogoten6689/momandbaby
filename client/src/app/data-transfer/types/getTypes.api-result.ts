import { ApiResult } from '../api-result';
import {TypePaging} from '../../view-model/type/type-paging';

export class GetTypesApiResult extends ApiResult {
  data: TypePaging;
}
