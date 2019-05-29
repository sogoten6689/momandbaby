import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { APIService } from '../api.service';
import { SpinService } from '../spin.service';
import { ApiResult } from '../../data-transfer/api-result';
import {GetTypesApiResult} from '../../data-transfer/types/getTypes.api-result';

@Injectable()
export class TypeService extends APIService {
  constructor(private http: HttpClient, private spintService: SpinService) {
  super(http, spintService);
}

public getTypesforMenu() {
  return super.apiGet<GetTypesApiResult>('/typesforMenu', null, false);
}

  public getAllType() {
    return super.apiGet<GetTypesApiResult>('/types', null, false);
  }

}
