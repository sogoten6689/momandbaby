import {Injectable} from '@angular/core';
import {APIService} from "./api.service";
import {HttpClient} from "@angular/common/http";
import {SpinService} from "./spin.service";
import {LoginModel} from "../view-model/user/login-model";
import {LoginApiResult} from "../view-model/user/login.api-result";
import {SignupModel} from "../view-model/user/signup-model";
import {ApiResult} from "../data-transfer/api-result";
import {UserApiResult} from '../view-model/user/user.api-result';
import {GetUsersApiResult} from '../data-transfer/users/getUsers.api-result';
import {UserResModel} from '../view-model/user/user-res-model';
import {PasswordEdit} from '../view-model/user/password';
import {ImageChange} from '../view-model/user/image-change';

@Injectable()
export class UserService extends APIService {

  constructor(private http: HttpClient, private spintService: SpinService) {
    super(http, spintService);
  }
  public  login( loginModel: LoginModel ){
    return super.apiPost<LoginApiResult>('/users/login', loginModel);
  }

  public  signup( signupModel: SignupModel ){
    return super.apiPost<ApiResult>('/users/signup', signupModel);
  }

  public getUser(id: string) {
    return super.apiGet<UserApiResult>('/users/'+id, null, true);
  }

  public getAllUser() {
    return super.apiGet<GetUsersApiResult>('/users', null, true);
  }

  public  updateUser( userModel: UserResModel ){
    return super.apiPut<ApiResult>('/users/'+userModel.id, userModel,null,true);
  }

  public getUserByFacebookId(id: string) {
    return super.apiGet<LoginApiResult>('/users/facebook/'+id, null, true);
  }

  public getUserByEmail(email: string) {
    return super.apiGet<LoginApiResult>('/users/email/'+email, null, true);
  }
  public changePass(id: any, password: PasswordEdit) {
    return super.apiPut<ApiResult>('/users/password/'+id, password, null,true);
  }
  public changeImage(id: any, imagenew: ImageChange) {
    return super.apiPut<ApiResult>('/users/updateimage/'+id, imagenew, null,true);
  }
  public downActive(id: any) {
    return super.apiPut<ApiResult>('/users/activeDown/'+id, null, null,true);
  }
  public upActive(id: any) {
    return super.apiPut<ApiResult>('/users/activeUp/'+id, null, null,true);
  }
}
