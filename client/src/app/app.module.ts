import { CommonModule } from '@angular/common';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { NgChatModule } from 'ng-chat';
import { BrowserModule } from '@angular/platform-browser';
//root
import { AppComponent } from './app.component';
import {AppRoutingModule,routingCoponents} from './app.routing';
//server
import {TypeService} from "./services/reader/type_services";
import {SpinService} from "./services/spin.service";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IndexComponent } from './views/index/index.component';
import { ContactComponent } from './views/contact/contact.component';
import { AboutComponent } from './views/about/about.component';
import { ErrorpageComponent } from './views/errorpage/errorpage.component';
import { BlogComponent } from './views/blog/blog.component';
import { TopicComponent } from './views/topic/topic.component';
import { CheckloginComponent } from './views/checklogin/checklogin.component';
import { LoginComponent } from './views/login/login.component';
import { DefaultLayoutComponent } from './views/default-layout/default-layout.component';
import { DefaulAdminLayoutComponent } from './views/admin/defaul-admin-layout/defaul-admin-layout.component';
import {AuthenticateService} from "./services/authenticate.service";
import {ToastrModule} from "ngx-toastr";
import {TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {TopicService} from "./services/reader/topic_services";
import { SearchTopicComponent } from './views/topics/search-topic/search-topic.component';
import {SharedModule} from "./views/shared/shared.module";
import { SignupComponent } from './views/signup/signup.component';
import { CreateTopicComponent } from './views/topics/create-topic/create-topic.component';
import { QuillModule } from 'ngx-quill';
import {UserService} from "./services/user.service";
import { FormTopicComponent } from './views/topics/form-topic/form-topic.component';
import {UploadFileService} from "./services/uploadfile.service";
import { UsersComponent } from './views/users/users.component';
import { UserComponent } from './views/user/user.component';
import {CommentService} from "./services/reader/comment_services";

import { EmbedComponent } from './views/embed/embed.component';
import {ChatService} from "./services/chat.service";
import {
  Ng6SocialButtonModule,
  SocialServiceConfig
} from "ng6-social-button";
import {CollapseModule} from 'ngx-bootstrap';
import { AppovedTopicComponent } from './views/admin/appoved-topic/appoved-topic.component';
import {AuthorizeService} from "./services/authorize.service";
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
} from '@angular/material';
import { TopicsByTypeComponent } from './views/topics/topics-by-type/topics-by-type.component';


// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
};

// Configs
export function getAuthServiceConfigs() {
  let config = new SocialServiceConfig()
    .addFacebook("2296570640609951")
    .addGoogle("492102139245-u83lgmshke8gkuj8sgm57o2n9pnv96kn.apps.googleusercontent.com");

  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    routingCoponents,
    IndexComponent,
    ContactComponent,
    AboutComponent,
    ErrorpageComponent,
    BlogComponent,
    TopicComponent,
    CheckloginComponent,
    LoginComponent,
    DefaultLayoutComponent,
    DefaulAdminLayoutComponent,
    SearchTopicComponent,
    SignupComponent,
    CreateTopicComponent,
    FormTopicComponent,
    UsersComponent,
    UserComponent,
    EmbedComponent,
    AppovedTopicComponent,
    TopicsByTypeComponent,
  ],
  imports: [
    NgbModule.forRoot(),
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    Ng6SocialButtonModule,
    // QuillEditorModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    QuillModule,
    FormsModule,
    HttpClientModule,
    NgChatModule,
    BrowserModule,
    FormsModule,
    CollapseModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule,

  ],
  providers: [
    Title,
    SpinService,
    AuthorizeService,
    TypeService,
    TopicService,
    CommentService,
    AuthenticateService,
    UserService,
    UploadFileService,
    ChatService,{
      provide: SocialServiceConfig,
      useFactory: getAuthServiceConfigs
    }
  ],
  bootstrap: [
    AppComponent
   
  ],

})
export class AppModule {}
