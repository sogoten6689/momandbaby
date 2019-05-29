import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

import { PaginationComponent } from './pagination/pagination.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { TopicInformationComponent } from './topic-information/topic-information.component';
import { ListTopicsComponent } from './list-topics/list-topics.component';
import { BannerComponent } from './banner/banner.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    PaginationComponent,
    ConfirmComponent,
    ListTopicsComponent,
    BannerComponent,
  ],
  entryComponents: [
    ConfirmComponent
  ],
  declarations: [
    PaginationComponent,
    ConfirmComponent,
    TopicInformationComponent,
    ListTopicsComponent,
    BannerComponent,
  ]
})
export class SharedModule { }
