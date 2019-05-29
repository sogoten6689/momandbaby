import { ApiResult} from "../../data-transfer/api-result";
import {LoginResVM} from "./login-res-model";

export class LoginApiResult extends  ApiResult{
  data: LoginResVM
}
