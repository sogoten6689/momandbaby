import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthenticateService} from "../../../services/authenticate.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {TranslateService} from "@ngx-translate/core";
import {TopicService} from "../../../services/reader/topic_services";
import {Topic} from "../../../view-model/topic/topic";
import {SessionVM} from "../../../view-model/session/session-vm";
import {User} from "../../../view-model/user/user";
import {UserService} from "../../../services/user.service";
import {TopicPaging} from "../../../view-model/topic/topic-paging";
import {MatCheckbox,} from "@angular/material";

@Component({
  selector: 'app-appoved-topic',
  templateUrl: './appoved-topic.component.html',
  styleUrls: ['./appoved-topic.component.scss']
})
export class AppovedTopicComponent implements OnInit {

  topicsNotApproved: TopicPaging;
  dataSource: [];
  listTopicId: number[] = [];
  userListShow: {};
  displayedColumns = ['id', 'title', 'author', 'type', 'created_at','approved'];
  expandedElement: Topic | null;
  public session: SessionVM;
  user: User = new User();

  constructor(
    private authService: AuthenticateService,
    private router: Router,
    private toastr: ToastrService,
    private translate: TranslateService,
    private topicServices: TopicService,
    private userService: UserService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.authService.session$.subscribe(
      data => {
        this.session = data;
        if (this.session && this.session.token != null && this.session.role != null) {
          this.user.fullname = this.session.fullname;
          this.user.id = this.session.id;
          if(this.session.role.code!= 'admin'){
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
    this.getTopicsNotApproved();
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
  private getTopicsNotApproved() {

    this.topicServices.getTopicNotApproved().subscribe(
      res => {
        if (res.success && res) {
          this.topicsNotApproved=  res.data;
          console.log("res.data");
          console.log(res.data);
        } else {
          this.toastr.error(res.message);
        }
      },
      error => {
        this.toastr.error(this.translate.instant('COMMON.GET.FAILED'));
      });
  }

  confirm() {
    const req = {
      "listID": this.listTopicId
    };
    this.topicServices.approvedListTopics(req).subscribe(
      res => {
        if (res.success && res) {
          this.router.navigate(['/']);
          this.toastr.success('COMMON.APPROVED.SUCCESS');
        } else {
          this.toastr.error(res.message);
        }
      },
      error => {
        this.toastr.error(this.translate.instant('COMMON.APPROVED.FAILED'));
      });
  }

  somethingClick(checkbox: MatCheckbox, element: { id: string }) {
    console.log(element.id);

    this.listTopicId.push(Number(element.id));
    console.log(this.listTopicId);
  }

}
