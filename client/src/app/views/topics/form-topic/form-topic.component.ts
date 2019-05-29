import {Component, Input, OnInit} from '@angular/core';
import {Topic} from "../../../view-model/topic/topic";
import {TypePaging} from "../../../view-model/type/type-paging";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {TranslateService} from "@ngx-translate/core";
import {TypeService} from "../../../services/reader/type_services";
import {deserialize, plainToClass} from "class-transformer";
import {HttpClient} from "@angular/common/http";
import {TopicService} from "../../../services/reader/topic_services";
import {SessionVM} from "../../../view-model/session/session-vm";
import {UploadFileService} from "../../../services/uploadfile.service";

@Component({
  selector: 'app-form-topic',
  templateUrl: './form-topic.component.html',
  styleUrls: ['./form-topic.component.scss']
})
export class FormTopicComponent implements OnInit {
  @Input() isEdit: boolean = false;
  @Input() topic: Topic;
  title: string;
  buttonText: string;
  typeList: TypePaging;
  topicData: Topic = new Topic();
  thumbnail: File = null;
  selectedFiles: FileList;
  quillEditorRef;
  maxUploadFileSize = 10000000;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private translate: TranslateService,
    private typeService: TypeService,
    private topicService: TopicService,
    private http:HttpClient,
    private uploadService: UploadFileService
  ) { }

  ngOnInit() {
    if(this.isEdit) {
      this.title = 'Edit topic';
      this.buttonText = 'Update';
    } else {
      this.title = 'Create topic';
      this.buttonText = 'Post';
    }
    this.getAllType();
  }

  getAllType(){
    this.typeService.getAllType().subscribe(
      res => {
        if (res.success && res.data) {
          console.log(res.data);
          this.typeList = plainToClass(TypePaging, res.data);
        } else {
          this.toastr.error(res.message);
        }
      },
      error => {
        this.toastr.error(this.translate.instant('COMMON.GET.FAILED'));
      });
  }

  validateTopic() {
    if (!this.selectedFiles) {
      this.toastr.error('Please select thumbnail for this topic!');
      return false;
    }

    return true;
  }

  submitTopic(){
    // upload image
    if(!this.validateTopic()) return;

    const file = this.selectedFiles.item(0);
    console.log("upload file: ");
    this.uploadService.uploadFile(file).subscribe( dataFile =>{
      // this.topicData.img = dataFile['Location'];
    // get current user
    const currentUser = localStorage.getItem('currentUser');


    if (currentUser != null) {
      const session = deserialize(SessionVM, currentUser);
      this.topicData.author= session.id;
      this.topicData.img=  "https://s3-us-west-2.amazonaws.com/babyandmom/" + dataFile["body"].name;
      this.topicData.content = this.quillEditorRef.root.innerHTML;
      console.log(this.topicData);
      this.topicService.insertTopic(this.topicData).subscribe(
        res => {
          console.log(res);
          if (res.success) {
            this.router.navigate(['/']);
            this.toastr.success(this.translate.instant('COMMON.CREATE.SUCCESS'));
          } else {
            console.log(res.message);
            this.toastr.error(res.message['errors'][0]['msg']);
          }
        },
        error => {
          console.log("error" +error);
          this.toastr.error(this.translate.instant('COMMON.CREATE.FAILED'));
        });
    } else {
      console.log("currentUser null");
      this.toastr.error(this.translate.instant('COMMON.CREATE.FAILED'));
    }
    } );


  }



  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  onInputFileChange(files:FileList){
    this.thumbnail = files.item(0);
    console.log(this.thumbnail);
  }
  getEditorInstance(editorInstance: any) {
    this.quillEditorRef = editorInstance;
    const toolbar = editorInstance.getModule('toolbar');
    toolbar.addHandler('image', this.imageHandler);
  }

  imageHandler = (image, callback) => {
    console.log('imageHandler');
    const input = <HTMLInputElement> document.getElementById('fileInputField');
    document.getElementById('fileInputField').onchange = () => {
      let file: File;
      file = input.files[0];
      // file type is only image.
      if (/^image\//.test(file.type)) {
        if (file.size > this.maxUploadFileSize) {
          alert('Image needs to be less than 10MB');
        } else {
          this.uploadService.uploadFile(file).subscribe( dataFile =>{
            // this.topicData.img = dataFile['Location'];
            console.log("RES  ");
            console.log(dataFile);

              const range = this.quillEditorRef.getSelection();
              const img = '<img src="https://s3-us-west-2.amazonaws.com/babyandmom/' + dataFile["body"].name + '" />';
              console.log(img);
            this.quillEditorRef.clipboard.dangerouslyPasteHTML(range.index, img);
            console.log(this.quillEditorRef.root.innerHTML);
          } );
        }
      } else {
        alert('You could only upload images.');
      }
    };
// console.log(image);
    input.click();
  }



}
