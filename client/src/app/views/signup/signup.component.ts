import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import {AuthenticateService} from "../../services/authenticate.service";
import {UserService} from "../../services/user.service";
import {SessionVM} from "../../view-model/session/session-vm";
import {SignupModel} from "../../view-model/user/signup-model";
import {LoginModel} from "../../view-model/user/login-model";
import {Role} from "../../view-model/roles/role-vm";
import {UserResModel} from '../../view-model/user/user-res-model';
import {SocialService} from 'ng6-social-button';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  shareObj = {
    href: 'FACEBOOK-SHARE-LINK',
    hashtag: '#FACEBOOK-SHARE-HASGTAG'
  };
  repeatpass: string;
  model: SignupModel = new SignupModel();
  modellogin: LoginModel = new LoginModel();
  session: SessionVM;
  id: number;
  facebook_id: string;
  image_url: string;
  name_facebook: string;
  email: string;
  modelSignup: SignupModel = new SignupModel();
  isUser: boolean;

  userShow: UserResModel;

  constructor(private router: Router, private socialAuthService: SocialService,
              private toastr: ToastrService, private authService: AuthenticateService, private userService: UserService) { }

  ngOnInit() {
    this.authService.session$.subscribe(
      data => {
        this.session = data;
        if ( this.session && this.session.token != null ){
          this.router.navigate(['/']);
        }
      }
    )
  }

  doSignUp() {
    function check(model: SignupModel, repeatpass: string,toastr: ToastrService) {
      if(!model.account){
        toastr.error('Phải nhập tên tài khoản!');
        return 0;
      }
      if(!model.email){
        toastr.error('Vui lòng nhập địa chỉ mail đúng!');
        return 0;
      }
      var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      if(!filter.test(model.email)){
        toastr.error('Email không đúng định dạng!');
        return 0;
      }

      if(!model.fullname){
        toastr.error('Hãy nhập tên của bạn!');
        return 0;
      }
      if(!model.password||model.password.length<8){
        toastr.error('Mật phải có ít nhất 8 kí tự!');
        return 0;
      }
      if(model.password!=repeatpass){
        toastr.error('Nhập lại mật khẩu không đúng!');
        return 0;
      }
      return 1;
    }
    if (check(this.model,this.repeatpass,this.toastr)) {
      console.log(this.model);
      this.userService.signup(this.model).subscribe(
        res => {
          if (res.success==true) {
            this.modellogin.account=this.model.account;
            this.modellogin.password=this.model.password;
            this.toastr.success("Đăng kí thành công!");
            this.userService.login(this.modellogin).subscribe(
              res2 =>{
                if( res2.data && res2.data.token ){
                  const newSession = new SessionVM(res2.data.id, res2.data.token, res2.data.role, res2.data.fullname, res2.data.account, res2.data.image_url);
                  this.authService.setSession(newSession);
                  console.log(newSession);
                  this.toastr.success("Đãng nhập thành công!");
                  if(newSession.role.code === Role.ROLES.ADMIN || newSession.role.code === Role.ROLES.MEMBER){
                    this.router.navigate(['/']);
                  }
                  else {
                    this.router.navigate(['/errorpage']);
                  }
                }
              }
            );
          } else {
            this.toastr.error(res.message);
          }
        },
        error => {
          this.toastr.error('nhap accunt va mat khau');
        });
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
            this.session = new SessionVM(res.data.id, res.data.token, res.data.role, res.data.fullname, res.data.account,res.data.image_url);
            this.authService.setSession(this.session);
            console.log(this.id);
            this.getUser();
            this.isUser = true;
            this.router.navigate(['/']);
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
            this.session = new SessionVM(res.data.id, res.data.token, res.data.role, res.data.fullname, res.data.account,res.data.image_url);
            this.authService.setSession(this.session);
            this.getUser();
            this.isUser = true;
            this.router.navigate(['/']);
          } else {
            this.doSignUpfb();
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

  doSignUpfb() {
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
