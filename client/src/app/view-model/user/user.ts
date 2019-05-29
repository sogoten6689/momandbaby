import {Role} from "../roles/role-vm";

export class User {
  id: number;
  account: string;
  fullname:string;
  role:Role;
  password: string;
  type: string;
  token:string;
  image_url: string;
  last_login: Date;
  active:number;
}
