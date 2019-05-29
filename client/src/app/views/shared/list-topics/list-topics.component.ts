import { Component, OnInit, Input } from '@angular/core';
import {TopicPaging} from "../../../view-model/topic/topic-paging";

@Component({
  selector: 'app-list-topics',
  templateUrl: './list-topics.component.html',
  styleUrls: ['./list-topics.component.scss']
})
export class ListTopicsComponent implements OnInit {
  @Input() topicsList: TopicPaging;
  constructor() { }

  ngOnInit() {
    console.log("topic list ");
    console.log(this.topicsList);
  }

}
