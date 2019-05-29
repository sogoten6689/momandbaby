import { Component, OnInit } from '@angular/core';
import {AuthenticateService} from '../../../services/authenticate.service';
import {Router} from '@angular/router';
import {SessionVM} from '../../../view-model/session/session-vm';
import {User} from '../../../view-model/user/user';

@Component({
  selector: 'app-defaul-admin-layout',
  templateUrl: './defaul-admin-layout.component.html',
  styleUrls: ['./defaul-admin-layout.component.scss']
})
export class DefaulAdminLayoutComponent implements OnInit {
  isOpen:boolean;
  public session: SessionVM;
  user: User = new User();
  constructor(private authService: AuthenticateService,
              private router: Router,) { }

  ngOnInit() {
    this.isOpen=true;
    this.authService.session$.subscribe(
      data => {
        this.session = data;
        console.log(data);
        if (this.session && this.session.token != null && this.session.role != null) {
          this.user.fullname = this.session.fullname;
          this.user.id = this.session.id;
          this.user.image_url=this.session.imagex;
          console.log(this.session);
          console.log(this.user);
        }
      }
    );
  }

}
