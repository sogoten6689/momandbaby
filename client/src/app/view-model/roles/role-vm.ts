export class Role {
  static ROLES = {
    ADMIN: 'admin',
    MEMBER: 'member'
  };

  id: number;
  code: string;
  name: string;

  constructor(id: number, code: string, name: string) {
    this.id = id;
    this.code = code;
    this.name = name;
  }
}
