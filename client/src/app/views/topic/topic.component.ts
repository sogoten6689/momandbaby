import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {TopicService} from '../../services/reader/topic_services';
import {Topic} from '../../view-model/topic/topic';
import {CommentModel} from '../../view-model/comment/commentAdd';
import {AuthenticateService} from '../../services/authenticate.service';
import {SessionVM} from '../../view-model/session/session-vm';
import {CommentService} from '../../services/reader/comment_services';
import {CommentModelRes} from '../../view-model/comment/commentRes';
import {
  SocialService
} from 'ng6-social-button';
import {deserialize} from 'class-transformer';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss']
})
export class TopicComponent implements OnInit {
  shareObj = {
    href: "https://mom-and-baby-iuh.firebaseapp.com",
    hashtag:"#MomAndBaby"
  };
  topic: Topic;
  urlstring: string;
  user_name: string;
  user_id: number;
  commentAdd: CommentModel;
  public session: SessionVM;
  listComment: CommentModelRes[];
  isComment: number;

  constructor(private authService: AuthenticateService, private socialAuthService: SocialService,
              private  topicService: TopicService,
              private  commentService: CommentService,
              private router: Router,
              private toastr: ToastrService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.commentAdd = new CommentModel();
    this.getTopic();
    this.getCommentByIdTopic();
    this.checkLogin();
  }

  getTopic() {
    const id = this.route.snapshot.paramMap.get('id');
    this.topicService.getLatestTopicById(id.toString()).subscribe(
      res=>{
        if(res.success){
          this.toastr.success('Lấy bài viết thành công!')
          this.topic= res.data;
          this.commentAdd.topic_id=this.topic.id;
         //"localhost:4200/topic/"+this.topic.id;
          this.shareObj.href="https://mom-and-baby-iuh.firebaseapp.com/topic/"+this.topic.id;
        } else {
          this.toastr.error('Đọc bài viết bị lỗi!');
        }
      });
  }

  getCommentByIdTopic() {
    const id = this.route.snapshot.paramMap.get('id');
    this.commentService.getListCommentByIdTopic(id).subscribe(
      res => {
        if (res.success) {
          console.log(res);
          this.listComment = res.data;
        } else {
          this.toastr.error('Không có bình luận nào!');
        }
      });
  }

  commentTopic() {
    this.urlstring = '/topics/' + this.topic.id + '/comments';
    this.checkLogin();
    if (this.isComment == 0) {
      this.toastr.error('Chưa đăng nhập!');
    } else {
      if (this.commentAdd.content != '') {
        this.commentService.commentTopic(this.urlstring, this.commentAdd).subscribe(
          res => {
            if (res.success) {
              this.commentAdd.content = '';
              this.getCommentByIdTopic();
              this.toastr.success('Đã bình luận!');
            } else {
              console.log(res);
              this.toastr.error('Lỗi!');
            }
          });
      } else {
        this.toastr.error('Nhập nội dung bình luận!');
      }

    }

  }

  likeTopic() {
    const id = this.route.snapshot.paramMap.get('id');
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser != null) {
      const session = deserialize(SessionVM, currentUser);
      let param={
        "user_id":session.id,
        "topic_id": id
      }
      this.topicService.likeTopic(param, id).subscribe(
        res => {
          if (res.success) {
            this.commentAdd.content = '';
            this.getTopic();
          } else {
            console.log(res);
            this.toastr.error('Lỗi!');
          }
        });
    } else {
      this.toastr.error('Chưa đăng nhập!');
    }

  }

  dislikeTopic() {
    const id = this.route.snapshot.paramMap.get('id');
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser != null) {
      const session = deserialize(SessionVM, currentUser);
      let param={
        "user_id":session.id,
        "topic_id": id
      }
      this.topicService.dislikeTopic(param, id).subscribe(
        res => {
          if (res.success) {
            this.commentAdd.content = '';
            this.getTopic();
          } else {
            console.log(res);
            this.toastr.error('Lỗi!');
          }
        });
    } else {
      this.toastr.error('Chưa đăng nhập!');
    }

  }

  checkLogin() {
    this.authService.session$.subscribe(
      data => {
        this.session = data;
        if (this.session && this.session.token != null && this.session.role != null) {
          this.commentAdd.user_id = this.session.id;
          this.user_name = this.session.fullname;
          this.user_id = this.session.id;
          this.isComment = 1;
        } else {
          this.isComment = 0;
        }
      }
    );
  }

  shareNomal(){
    this.copyText(this.shareObj.href);
  }

  copyText(val: string){
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.toastr.info("Đã sao chép địa chỉ bài viết vào bộ nhớ tạm");
  }

}
