import { Type } from 'class-transformer';

import { Role } from '../roles/role-vm';

export class SessionVM {
  token: string;
  fullname: string;
  account: string;
  id: number;
  @Type(() => Role)
  role: Role;
  imagex:string;
  email:string;
  provider:string;

  constructor(id:number,token: string, role: Role, fullname: string, account: string,imagex: string) {
    this.id = id;
    this.token = token;
    this.role = role;
    this.fullname = fullname;
    this.account = account;
    this.imagex = imagex;
  }

  updateToken(newToken: string) {
    this.token = newToken;
  }
}
