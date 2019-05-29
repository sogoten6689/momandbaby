import { ApiResult } from '../api-result';
import {TopicPaging} from '../../view-model/topic/topic-paging';
import {Topic} from '../../view-model/topic/topic';

export class TopicApiResult extends ApiResult {
  data: Topic;
}
