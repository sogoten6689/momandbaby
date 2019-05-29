import { Component, OnInit } from '@angular/core';
import {AuthenticateService} from '../../../services/authenticate.service';
import {TopicService} from '../../../services/reader/topic_services';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {TopicPaging} from '../../../view-model/topic/topic-paging';
import {plainToClass} from 'class-transformer';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-topics-by-type',
  templateUrl: './topics-by-type.component.html',
  styleUrls: ['./topics-by-type.component.scss']
})
export class TopicsByTypeComponent implements OnInit {

  topicsList: TopicPaging;
  constructor(private authService: AuthenticateService,
              private router: Router,
              private route : ActivatedRoute,
              private toast: ToastrService,
              private translate: TranslateService,
              private topicService: TopicService) { }

  ngOnInit() {
    let typeid = this.route.snapshot.paramMap.get('id');
    this.getTopics(typeid);
  }
  getTopics(type_id){
    this.topicService.getTopicByTypeId(type_id).subscribe(
      res => {
        if (res.success && res.data) {
          this.topicsList = plainToClass(TopicPaging,res.data);
          // this.topicsList.page_size = ;
          this.topicsList = plainToClass(TopicPaging,res.data);
          console.log(this.topicsList);
        } else {
          this.toast.error(res.message);
        }
      },
      error => {
        this.toast.error(this.translate.instant('COMMON.GET.FAILED'));
      });
  }
}
