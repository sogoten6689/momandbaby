import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LoginModel} from '../../view-model/user/login-model';
import {SessionVM} from '../../view-model/session/session-vm';
import {UserService} from '../../services/user.service';
import {AuthenticateService} from '../../services/authenticate.service';
import {Role} from '../../view-model/roles/role-vm';
import {ToastrService} from 'ngx-toastr';
import {
  SocialService
} from 'ng6-social-button';
import {UserResModel} from '../../view-model/user/user-res-model';
import {SignupModel} from '../../view-model/user/signup-model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  shareObj = {
    href: 'FACEBOOK-SHARE-LINK',
    hashtag: '#FACEBOOK-SHARE-HASGTAG'
  };
  model: LoginModel = new LoginModel();
  session: SessionVM;
  id: number;
  facebook_id: string;
  image_url: string;
  name_facebook: string;
  email: string;
  modelSignup: SignupModel = new SignupModel();
  isUser: boolean;

  userShow: UserResModel;

  constructor(private router: Router, private toastr: ToastrService, private socialAuthService: SocialService,
              private authService: AuthenticateService, private userService: UserService) {
  }

  ngOnInit() {
    this.isUser = false;
    this.authService.session$.subscribe(
      data => {
        this.session = data;
        if (this.session && this.session.token != null) {
          this.router.navigate(['/']);
        }
      }
    );
  }

  doLogin() {
    if (this.model.account && this.model.password) {
      this.userService.login(this.model).subscribe(
        res => {
          console.log(res);
          if (res.data && res.data.token) {
            if(res.data.active==0){
              this.toastr.error("Tài khoản đang bị khóa!")
            }
            else {
              console.log(res.data.image_url);
              this.session = new SessionVM(res.data.id, res.data.token, res.data.role, res.data.fullname, res.data.account,res.data.image_url);
              console.log(this.session);
              this.authService.setSession(this.session);
              console.log(this.session);
              if (this.session.role.code === Role.ROLES.ADMIN || this.session.role.code === Role.ROLES.MEMBER) {
                this.toastr.success("Đăng nhập thành công");
                this.router.navigate(['/']);
              } else {
                this.toastr.error('Lỗi dữ liệu');
                this.router.navigate(['/errorpage']);
              }
            }
          } else {
            this.toastr.success("Account hoặc mật khẩu không đúng!");
          }
        }
      );

    }
  }

  getSocialUser(socialUser) {
    console.log(socialUser);
    if (socialUser && socialUser.accessToken) {
      this.facebook_id = socialUser.id;
      this.email = socialUser.email;
      this.image_url = socialUser.image;
      console.log(this.image_url);
      this.name_facebook = socialUser.name;
      this.getUserByFaceBookId();
      this.toastr.success('Đăng nhập facebook thành công!');
    } else {
      this.toastr.error('Đăng nhập facebook không thành công!');
    }
  }

  getUserByFaceBookId() {
    if (this.facebook_id) {
      this.userService.getUserByFacebookId(this.facebook_id).subscribe(
        res => {
          if (res.success && res.data) {
            if(res.data.active==0){
              this.toastr.error("Tài khoán đang bị khóa!");
            }
            else {
              this.session = new SessionVM(res.data.id, res.data.token, res.data.role, res.data.fullname, res.data.account,res.data.image_url);
              this.authService.setSession(this.session);
              console.log(this.id);
              this.getUser();
              this.isUser = true;
              this.router.navigate(['/']);
            }
          } else {
            if (this.email) {
              console.log('email');
              this.getUserByEmail();
            } else {
              this.doSignUp();
            }
            this.isUser = false;
          }
        });
    }
  }

  getUserByEmail() {
    if (this.email) {
      this.userService.getUserByEmail(this.email).subscribe(
        res => {
          if (res.success && res.data) {

            if(res.data.active==0){
              this.toastr.error("Tài khoán đang bị khóa!");
            }
            else{

              this.session = new SessionVM(res.data.id, res.data.token, res.data.role, res.data.fullname, res.data.account,res.data.image_url);
              this.authService.setSession(this.session);
              this.getUser();
              this.isUser = true;
              this.router.navigate(['/']);
            }
          } else {
            this.doSignUp();
            this.isUser = false;
          }
        });
    }
  }

  doUpdateUser() {
    console.log(this.userShow);
    this.userService.updateUser(this.userShow).subscribe(
      res => {
        if (res.success && res.data) {
          this.router.navigate(['/']);
        }
      });
  }

  doSignUp() {
    if (this.name_facebook == null) {
      this.name_facebook = this.facebook_id;
    }
    if (this.email == null) {
      this.email = 'email' + this.facebook_id + '@momandbaby.com';
      this.modelSignup.account = this.facebook_id;
    } else {
      this.modelSignup.account = this.email;
    }
    this.modelSignup.fullname = this.name_facebook;
    this.modelSignup.email = this.email;
    this.modelSignup.password = '12345678';
    this.modelSignup.phone = '0000000000';
    this.modelSignup.address = 'facebook';
    this.userService.signup(this.modelSignup).subscribe(
      res => {
        if (res.success == true) {
          this.getUserByFaceBookId();
        } else {
          console.log(res);
        }
      });
  }

  getUser() {
    if (this.id) {
      this.userService.getUser(this.id.toString()).subscribe(
        res => {
          if (res.success && res.data) {
            this.userShow = res.data;
            console.log(this.userShow);
            if (this.userShow.facebook_account == null) {
              this.userShow.facebook_account = 'fb.com';
            }
            if (this.userShow.twitter_account == null) {
              this.userShow.twitter_account = 'fb.com';
            }
            if (this.facebook_id != null && this.userShow.facebook_account == 'fb.com') {
              this.userShow.facebook_account = this.facebook_id;
            }
            if (this.email != null && (this.userShow.email == '' || this.userShow.email == 'email' + this.facebook_id + '@momandbaby.com')) {
              this.userShow.email = this.email;
            }
            if (this.name_facebook != null && (this.userShow.fullname == '' || this.userShow.fullname == this.facebook_id)) {
              this.userShow.fullname = this.name_facebook;
            }
            console.log(this.image_url);
            console.log(this.userShow.image_url);
            if (this.image_url != null && (this.userShow.image_url == '' || this.userShow.image_url == null)) {
              this.userShow.image_url = this.image_url;
            }
            this.doUpdateUser();
          }
        });
    }
  }

}
