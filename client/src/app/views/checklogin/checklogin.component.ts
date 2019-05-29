import {Component, OnInit} from '@angular/core';
import {User} from "../../view-model/user/user";
import {UserService} from "../../services/user.service";
import {AuthenticateService} from "../../services/authenticate.service";
import {SessionVM} from "../../view-model/session/session-vm";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {SocialService} from 'ng6-social-button';


@Component({
  selector: 'app-checklogin',
  templateUrl: './checklogin.component.html',
  styleUrls: ['./checklogin.component.scss']
})
export class CheckloginComponent implements OnInit {
  user: User = new User();
  public session: SessionVM;
  ischeck:boolean;
  constructor(private authService: AuthenticateService, private userService: UserService,
              private router: Router,private socialAuthService: SocialService,
              private toastr: ToastrService,) {
  }

  ngOnInit() {
    this.authService.session$.subscribe(
      data => {
        this.session = data;
        if (this.session && this.session.token != null && this.session.role != null) {
          this.user.fullname = this.session.fullname;
          this.user.id = this.session.id;
          this.getUser(this.user.id);
        }
      }
    );

  }

  login() {
    this.router.navigate(['/login']);
  }

  redirectPostTopic(){
    this.router.navigate(['/topics/new']);
  }

  redirectChat(){
    this.router.navigate(['/embed']);
  }

  logout() {
    this.signOut();
    this.authService.clearSession();
    this.router.navigate(['/']);
    window.location.reload();
  }
  viewMyAccount() {
    this.router.navigate(['/users/'+this.session.id]);
  }
  getUser(id) {
    if (id) {
      this.userService.getUser(id).subscribe(
        res => {
          if (res.success && res.data) {
            this.user.account=res.data.account;
            this.user.image_url = res.data.image_url;
            this.ischeck = true;
          }
          else {
            this.ischeck = false;
          }
        });
    }
  }

  signOut(){
    if(this.socialAuthService.isSocialLoggedIn()){
      this.socialAuthService.signOut().catch((err)=>{

      });
    }
  }

}
