import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { APIService } from '../api.service';
import { SpinService } from '../spin.service';
import { ApiResult } from '../../data-transfer/api-result';
import {GetCommentsApiResult} from '../../data-transfer/comments/getComments.api-result';

@Injectable()
export class CommentService extends APIService {
  constructor(private http: HttpClient, private spintService: SpinService) {
    super(http, spintService);
  }

  public  getListCommentByIdTopic(id){
    const urlstring="topics/"+id+"/comments";
    return super.apiGet<GetCommentsApiResult>(urlstring,null, false);
  }

  public commentTopic(url,comment) {
    return super.apiPost<ApiResult>(url, comment,null,true);
  }

}
