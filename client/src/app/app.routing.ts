import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {IndexComponent} from './views/index/index.component';
import {ContactComponent} from "./views/contact/contact.component";
import {AboutComponent} from "./views/about/about.component";
import {BlogComponent} from "./views/blog/blog.component";
import {ErrorpageComponent} from "./views/errorpage/errorpage.component";
import {TopicComponent} from './views/topic/topic.component';
import {LoginComponent} from "./views/login/login.component";
import {DefaultLayoutComponent} from './views/default-layout/default-layout.component';
import {AuthorizeService} from './services/authorize.service';
import {Role} from './view-model/roles/role-vm';
import {DefaulAdminLayoutComponent} from './views/admin/defaul-admin-layout/defaul-admin-layout.component';
import {AppComponent} from "./app.component";
import {SearchTopicComponent} from "./views/topics/search-topic/search-topic.component";
import {SignupComponent} from "./views/signup/signup.component";
import {CreateTopicComponent} from "./views/topics/create-topic/create-topic.component";
import {EmbedComponent} from "./views/embed/embed.component";
import {UserComponent} from './views/user/user.component';
import {UsersComponent} from './views/users/users.component';
import {AppovedTopicComponent} from "./views/admin/appoved-topic/appoved-topic.component";
import {TopicsByTypeComponent} from './views/topics/topics-by-type/topics-by-type.component';

export const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: '' ,
        component: IndexComponent,
        data: {
          title: 'Home'
        }
      },
      {
        path: 'contact',
        component: ContactComponent,
        data: {
          title: 'contact'
        }
      },
      {
        path: 'about',
        component: AboutComponent,
        data: {
          title: 'about'
        }
      },
      {
        path: 'blog',
        component: BlogComponent,
        data: {
          title: 'blog'
        }
      },
      {
        path: 'errorpage',
        component: ErrorpageComponent,
        data: {
          title: 'errorpage'
        }
      },
      {
        path: 'topics/search/:search_key',
        data: {title: 'Search' },
        component: SearchTopicComponent,
      },
      {
        path: 'topic/:id',
        component: TopicComponent,
        data: {
          title: 'Bài viết'
        }
      },
      {
        path: 'topics/new',
        component: CreateTopicComponent,
        data: {
          title: 'New topic'
        }
      },
      {
        path: 'types/:id',
        component: TopicsByTypeComponent,
        data: {
          title: 'Bài viết theo loại'
        }
      },
      {
        path: 'signup',
        component: SignupComponent,
        data: {
          title: 'Signup'
        }
      },
      {
        path: 'login',
        component: LoginComponent,
        data: {
          title: 'Login'
        }
      },
      {
        path: 'embed',
        component: EmbedComponent,
        data: {
          title: 'Embed'
        }
      },{
        path: 'users/:id',
        component: UserComponent,
        data: {
          title: 'Tài khoản'
        }
      },{
        path: 'users',
        component: UsersComponent,
        data: {
          title: 'Thành viên'
        }
      },
      {
        path: 'admin/approved',
        canActivate: [AuthorizeService],
        data: { roles: [Role.ROLES.ADMIN] },
        component: AppovedTopicComponent,
      },
      // {
      //   path: 'types/:id/topics/',
      //   // component: ListComponent,
      //   data: {
      //     title: 'Search'
      //   },
      // },
    ]
  }
  // {
  //   path: 'admin',
  //   component: DefaulAdminLayoutComponent,
  //   children: [
  //     // {
  //     //   path: '',
  //     //   canActivate: [AuthorizeService],
  //     //   data: {roles: [Role.ROLES.ADMIN]},
  //     //   loadChildren: './views/users/users.module#UsersModule'
  //     // },
  //     {
  //       path: 'index',
  //       component: IndexComponent,
  //       data: {
  //         title: 'Home'
  //       }
  //     },
  //     {
  //       path: 'login',
  //       component: LoginComponent,
  //       data: {
  //         title: 'Login'
  //       }
  //     },
  //     {
  //       path: 'contact',
  //       component: ContactComponent,
  //       data: {
  //         title: 'contact'
  //       }
  //     },
  //     {
  //       path: 'about',
  //       component: AboutComponent,
  //       data: {
  //         title: 'about'
  //       }
  //     },
  //     {
  //       path: 'blog',
  //       component: BlogComponent,
  //       data: {
  //         title: 'blog'
  //       }
  //     },
  //     {
  //       path: 'errorpage',
  //       component: ErrorpageComponent,
  //       data: {
  //         title: 'errorpage'
  //       }
  //     },
  //     {
  //       path: 'BlogOne',
  //       component: BlogOneComponent,
  //       data: {
  //         title: 'BlogOne'
  //       }
  //     }
  //   ]
  // },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
export const routingCoponents = [
  AppComponent,
  IndexComponent,
  LoginComponent,
];
