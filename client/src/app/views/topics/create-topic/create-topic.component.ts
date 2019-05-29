import { Component, OnInit } from '@angular/core';
import {SessionVM} from "../../../view-model/session/session-vm";
import {User} from "../../../view-model/user/user";
import {AuthenticateService} from "../../../services/authenticate.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-create-topic',
  templateUrl: './create-topic.component.html',
  styleUrls: ['./create-topic.component.scss']
})
export class CreateTopicComponent implements OnInit {
  public session: SessionVM;
  user: User = new User();
  constructor(private authService: AuthenticateService, private router: Router,
              private toastr: ToastrService, private userService: UserService,private route: ActivatedRoute) { }
  ngOnInit() {
    this.authService.session$.subscribe(
      data => {
        this.session = data;
        if (this.session && this.session.token != null && this.session.role != null) {
          this.user.fullname = this.session.fullname;
          this.user.id = this.session.id;
        } else {
          this.router.navigate(['/']);
        }
      }
    );
  }

}
