import { Component, OnInit } from '@angular/core';
import {AuthenticateService} from "../../../services/authenticate.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {TranslateService} from "@ngx-translate/core";
import {TypeService} from "../../../services/reader/type_services";
import {TopicService} from "../../../services/reader/topic_services";
import {TopicPaging} from "../../../view-model/topic/topic-paging";
import {plainToClass} from "class-transformer";

@Component({
  selector: 'app-search-topic',
  templateUrl: './search-topic.component.html',
  styleUrls: ['./search-topic.component.scss']
})
export class SearchTopicComponent implements OnInit {

  topicsList: TopicPaging;

  constructor(private authService: AuthenticateService,
              private router: Router,
              private route : ActivatedRoute,
              private toast: ToastrService,
              private translate: TranslateService,
              private topicService: TopicService) { }

  ngOnInit() {
    let title =this.route.snapshot.paramMap.get('search_key');
    this.getSearchTopic(title);
  }
  getSearchTopic(search_key){
    this.topicService.searchTopicbyTitle(search_key).subscribe(
      res => {
        console.log(res);
        if (res.success && res.data) {
          this.topicsList = plainToClass(TopicPaging,res.data);
        } else {
          this.toast.error(res.message);
        }
      },
      error => {
        this.toast.error(this.translate.instant('COMMON.GET.FAILED'));
      });

  }

}
