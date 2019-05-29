import {Component, OnInit} from '@angular/core';
import {SessionVM} from '../../view-model/session/session-vm';
import {ToastrService} from 'ngx-toastr';
import {User} from '../../view-model/user/user';
import {AuthenticateService} from '../../services/authenticate.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {UserResModel} from '../../view-model/user/user-res-model';
import {UploadFileService} from '../../services/uploadfile.service';
import {HttpClient} from '@angular/common/http';
import {PasswordEdit} from '../../view-model/user/password';
import {ImageChange} from '../../view-model/user/image-change';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit {
  isEdit: boolean;
  isUpfile:boolean;
  user: User = new User();
  userShow: UserResModel;
  namefull: string;
  image_user_old:string;
  imageSrc: string;
  imagenew:ImageChange = new ImageChange();
  passnewagain: string;
  id: number;

  password2: PasswordEdit = new PasswordEdit();
  // file hinh
  user_img: File = null;
  selectedFiles: FileList;
  public session: SessionVM;

  constructor(private authService: AuthenticateService, private router: Router,
              private uploadService: UploadFileService,
              private http: HttpClient,
              private toastr: ToastrService, private userService: UserService,private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.isEdit=true;
    this.id = +this.route.snapshot.paramMap.get('id');
      this.authService.session$.subscribe(
      data => {
        this.session = data;
        if (this.session && this.session.token != null && this.session.role != null) {
          this.user.fullname = this.session.fullname;
          this.user.id = this.session.id;
          this.user.role = this.session.role;
          this.getUser();
        } else {
          this.router.navigate(['/']);
        }
      }
    );
  }
  changeEdit(){
    if(this.isEdit==false){
      window.location.reload();
    }
    console.log(this.isEdit)
    this.isEdit=!this.isEdit;
  }

  getUser() {
    if (this.id) {
      this.userService.getUser(this.id.toString()).subscribe(
        res => {
          if (res.success && res.data) {
            this.userShow=res.data;
            this.namefull=res.data.fullname;
            this.image_user_old=res.data.image_url;
            if(this.userShow.facebook_account==null){
              this.userShow.facebook_account="fb.com";
            }
            if(this.userShow.twitter_account==null){
              this.userShow.twitter_account="fb.com";
            }
          }
        });
    }
  }
  doUpdateUser(){
    console.log(this.userShow);
    this.userService.updateUser(this.userShow).subscribe(
      res => {
        if (res.success && res.data) {
          this.toastr.success('Cập nhật thành công!');
          this.getUser();
          window.location.reload();
        } else {
          console.log(res);
          this.toastr.error('Lỗi hoặc không đủ quyền thực hiện!');
        }
      });
  }
  selectFile(event) {
    const reader = new FileReader();
    if (event.target.files&&event.target.files.item(0)){
      this.selectedFiles = event.target.files;
      reader.readAsDataURL(event.target.files.item(0));
      console.log(reader.result);
      reader.onload = (e: any) =>this.imageSrc=e.target.result;
      this.isUpfile=true;
    }
    else {
      this.imageSrc=null;
      this.isUpfile=false;
      console.log(this.isUpfile);
    }
  }

  doUpFile(){
    if(this.selectedFiles&&this.selectedFiles.item(0)){
      const file = this.selectedFiles.item(0);
      console.log(file);
      console.log("upload file: ");
      this.uploadService.uploadFile(file).subscribe(dataFile => {
        console.log("RES  ");
        console.log(dataFile);
        // get current user
        this.userShow.image_url = "https://s3-us-west-2.amazonaws.com/babyandmom/" + dataFile["body"].name;
        this.imagenew.image_urlnew  = "https://s3-us-west-2.amazonaws.com/babyandmom/" + dataFile["body"].name;
        this.toastr.info("Đang up file...","thông báo",{timeOut:10000});
        setTimeout( ()=> {
          this.userService.changeImage(this.id,this.imagenew).subscribe(
            res => {
              if (res.success && res.data) {
                this.toastr.success('Cập nhật thành công!');
                this.getUser();
                window.location.reload();
              } else {
                console.log(res);
                this.toastr.error('Lỗi hoặc không đủ quyền thực hiện!');
              }
            });
        },12000);
      });
    }
    else{
      this.toastr.error("Chưa chọn ảnh!")
    }
  };

  changePass(){
    if(this.password2.passnew.length>=8&&this.password2.passold.length>=8&&this.passnewagain==this.password2.passnew){
      this.userService.changePass(this.id,this.password2).subscribe(
        res => {
          if (res.success && res.data) {
            this.toastr.success('Cập nhật thành công!');
          } else {
            console.log(res);
            this.toastr.error('Mật khẩu không đúng');
          }
        });
    }
    else{
      this.toastr.error('Vui lòng mật khẩu có ít nhất 8 chữ số');
    }
  }
  activeUp(){
    this.userService.upActive(this.id).subscribe(
      res =>{
      if (res.success) {
        this.getUser();
        this.toastr.success('Đã mở khóa thành công!');
      }
      else{
        this.toastr.error("Không thực hiện được!");
      }
    });
  }
  activeDown(){
    this.userService.downActive(this.id).subscribe(
      res =>{
        if (res.success) {
          this.getUser();
          this.toastr.warning('Đã khóa tài khoản');
        }
        else{
          this.toastr.error("Không thực hiện được!");
        }
      });
  }
}
