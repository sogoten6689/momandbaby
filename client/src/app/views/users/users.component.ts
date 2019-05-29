import { Component, OnInit } from '@angular/core';
import {User} from '../../view-model/user/user';
import {UserResModel} from '../../view-model/user/user-res-model';
import {SessionVM} from '../../view-model/session/session-vm';
import {AuthenticateService} from '../../services/authenticate.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  styleList: number;
  user: User = new User();
  userListShow: UserResModel[];
  public session: SessionVM;

  constructor(private authService: AuthenticateService, private router: Router,
              private toastr: ToastrService, private userService: UserService,private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.styleList = 0;
    this.authService.session$.subscribe(
      data => {
        this.session = data;
        if (this.session && this.session.token != null && this.session.role != null) {
          this.user.fullname = this.session.fullname;
          this.user.id = this.session.id;
          if(this.session.role.code!='admin'){
            this.router.navigate(['/']);
          }
          else{
            this.getAllUsers();
          }
        } else {
          this.router.navigate(['/']);
        }
      }
    );
  }
  changeStyle(value){
    this.styleList=value;
  }

  getAllUsers() {
      this.userService.getAllUser().subscribe(
        res => {
          if (res.success && res.data) {
            this.userListShow=res.data;
          } else {
            this.toastr.error('Lỗi hoặc không đủ quyền thực hiện!');
          }
        });
    }
}
