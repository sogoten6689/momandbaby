import {Component, OnInit} from '@angular/core';
import {AuthenticateService} from "../../services/authenticate.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {TranslateService} from "@ngx-translate/core";
import {SessionVM} from "../../view-model/session/session-vm";
import {Role} from "../../view-model/roles/role-vm";
import {TypeService} from "../../services/reader/type_services";
import {TypePaging} from "../../view-model/type/type-paging";
import {User} from '../../view-model/user/user';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss']
})
export class DefaultLayoutComponent implements OnInit {
  public navItems: TypePaging;
  user: User = new User();
  private changes: MutationObserver;
  public element: HTMLElement = document.body;
  public session: SessionVM;
  public showBanner: boolean = false;
  search_key: String;
  isAdmin:boolean;


  constructor(private authService: AuthenticateService,
              private router: Router,
              private toastr: ToastrService,
              private translate: TranslateService,
              private typeService: TypeService) {
  }

  ngOnInit() {
    this.isAdmin=false;
    this.authService.session$.subscribe(
      data => {
        this.session = data;
        if (this.session && this.session.token != null && this.session.role != null) {
          this.user.fullname = this.session.fullname;
          this.user.id = this.session.id;
          if(this.session.role&&this.session.role.code=="admin"){
            this.isAdmin=true;
          }
        }
      }
    );
    this.getMenu();
  }

  getMenu() {
    this.typeService.getTypesforMenu().subscribe(
      res => {
        if (res.success && res.data) {
          this.navItems = res.data;
        } else {
          this.toastr.error(res.message);
        }
      },
      error => {
        this.toastr.error(this.translate.instant('COMMON.GET.FAILED'));
      });
  }

  search(){
    this.router.navigate(['/topics/search', this.search_key]);
  }

}
