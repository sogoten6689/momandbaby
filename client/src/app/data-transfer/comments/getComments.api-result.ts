import { ApiResult } from '../api-result';
import {CommentModelRes} from '../../view-model/comment/commentRes';

export class GetCommentsApiResult extends ApiResult {
  data: CommentModelRes[];
}
