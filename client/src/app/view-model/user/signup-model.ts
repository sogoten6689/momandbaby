export class SignupModel {
  account: string;
  email: string;
  fullname: string;
  password: string;
  address: string;
  phone: string;
  facebook_account: string;
  twitter_account: string;
  img_url: string;

  constructor() {
    this.account=''
    this.email = '';
    this.fullname = '';
    this.password = '';
    this.address = '';
    this.phone = '';
    this.img_url = '../../../assets/img/user.png';
  }
}
