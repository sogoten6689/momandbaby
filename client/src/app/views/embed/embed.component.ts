import { Component, OnInit } from '@angular/core';
import Chatkit from '@pusher/chatkit-client';
import axios from 'axios';
import { SessionVM } from '../../view-model/session/session-vm';
import { deserialize } from 'class-transformer';
import {ChatService} from "../../services/chat.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-embed',
  templateUrl: './embed.component.html',
  styleUrls: ['./embed.component.scss']
})

export class EmbedComponent {

  constructor(private  chatService: ChatService, private router: Router,
              private toastr: ToastrService,private route: ActivatedRoute) { }

  title = 'Angular Chatroom';
  messages = [];
  users = [];
  listUsers;
  listRooms;
  roomId;
  roomName = "";
  lstChecked = [];
  currentUser: any;
  currentId;
  _username: string = '';
  _nameRoom: string = 'Room';
  ngOnInit() {
    this.getListUsers();
    this.getListRoomsOfUser();
  }

  get username(): string {
    return this._username;
  }
  set username(value: string) {
    this._username = value;
  }

  _message: string = '';
  get message(): string {
    return this._message;
  }
  set message(value: string) {
    this._message = value;
  }

  sendMessage() {
    const { message, currentUser, roomId } = this;
    currentUser.sendMessage({
      text: message,
      roomId: roomId,
    });
    this.message = '';

  }

  addUser() {
    const currentUser = localStorage.getItem('currentUser');
    const session = deserialize(SessionVM, currentUser);
    const { username } = this;
    axios.post('https://momandbabyserveriuh.herokuapp.com/chat/newUserChat', { username })
      .then(() => {
        const tokenProvider = new Chatkit.TokenProvider({
          url: 'https://momandbabyserveriuh.herokuapp.com/chat/auth',
          headers: {
            "x-api-key":"123@mom_and_baby_tool",
            "x-access-token":session.token
          }
        });
        const chatManager = new Chatkit.ChatManager({
          instanceLocator: 'v1:us1:d3b47aed-c439-4dc3-ae2a-06e6cf178edb',
          userId: username,
          tokenProvider
        });

        return chatManager
          .connect()
          .then(currentUser => {
            currentUser.subscribeToRoom({
              roomId: '21150536',
              messageLimit: 100,
              hooks: {
                onMessage: message => {
                  this.messages.push(message);
                },
                onPresenceChanged: (state, user) => {
                  this.users = currentUser.users.sort((a, b) => {
                    if (a.presence.state === 'online') return -1;

                    return 1;
                  });
                },
              },
            });

            this.currentUser = currentUser;
            this.users = currentUser.users;
          });
      })
      .catch(error => console.error(error))
  }

  chat(roomId, roomName) {
    this.messages = [];
    const currentUser = localStorage.getItem('currentUser');
    const session = deserialize(SessionVM, currentUser);
    const tokenProvider = new Chatkit.TokenProvider({
      url: 'https://momandbabyserveriuh.herokuapp.com/chat/auth',
      headers: {
        "x-api-key":"123@mom_and_baby_tool",
        "x-access-token":session.token
      }
    });
    const chatManager = new Chatkit.ChatManager({
      instanceLocator: 'v1:us1:d3b47aed-c439-4dc3-ae2a-06e6cf178edb',
      userId: session.account,
      tokenProvider
    });

    return chatManager
      .connect()
      .then(currentUser => {
        currentUser.subscribeToRoom({
          roomId: roomId,
          messageLimit: 100,
          hooks: {
            onMessage: message => {
              this.messages.push(message);
            },
            onPresenceChanged: (state, user) => {
              this.users = currentUser.users.sort((a, b) => {
                if (a.presence.state === 'online') return -1;

                return 1;
              });
            },
          },
        });

        this.currentUser = currentUser;
        this.users = currentUser.users;
        this.roomId = roomId;
        this.roomName = roomName;
      });

    //const { username } = this;
    /*axios.post('http://localhost:3000/chat/newUserChat', { username })
      .then(() => {
        const tokenProvider = new Chatkit.TokenProvider({
          url: 'http://localhost:3000/chat/auth',
          headers: {
            "x-api-key":"123@mom_and_baby_tool",
            "x-access-token":session.token
          }
        });
        const chatManager = new Chatkit.ChatManager({
          instanceLocator: 'v1:us1:d3b47aed-c439-4dc3-ae2a-06e6cf178edb',
          userId: username,
          tokenProvider
        });

        return chatManager
          .connect()
          .then(currentUser => {
            currentUser.subscribeToRoom({
              roomId: '21150536',
              messageLimit: 100,
              hooks: {
                onMessage: message => {
                  this.messages.push(message);
                },
                onPresenceChanged: (state, user) => {
                  this.users = currentUser.users.sort((a, b) => {
                    if (a.presence.state === 'online') return -1;

                    return 1;
                  });
                },
              },
            });

            this.currentUser = currentUser;
            this.users = currentUser.users;
          });
      })
      .catch(error => console.error(error))*/
  }

  getListUsers(){
    const currentUser = localStorage.getItem('currentUser');
    const session = deserialize(SessionVM, currentUser);

    if(session != null && session.account != null){
      this.currentId = session.account;
      this.chatService.getListUser().subscribe(
        res=> {
          if (res.success) {
            this.listUsers= res.data;

          } else {
            //this.toastr.error('Đọc bài viết bị lỗi!')
          }

        });
    }

    // axios.post('http://localhost:3000/chat/getListUsers')
    //   .then(currentUser=> {
    //     console.log(currentUser)
    //     this.listUsers = currentUser.data;
    //   })
    //   .catch(error => console.error(error))
  }

  getListRooms(){
    const currentUser = localStorage.getItem('currentUser');
    const session = deserialize(SessionVM, currentUser);
    const { username } = this;
    const headers= {
      "x-api-key":"123@mom_and_baby_tool",
      "x-access-token":session.token
    };
    this.chatService.getListRoom().subscribe(
      res=> {
        console.log(res);
        if (res.success) {
          this.listRooms= res.data;

        } else {
          //this.toastr.error('Đọc bài viết bị lỗi!')
        }

      });

  }

  getListRoomsOfUser(){
    const currentUser = localStorage.getItem('currentUser');
    const session = deserialize(SessionVM, currentUser);
    const { username } = this;
    if(session != null && session.account != null){
      this.chatService.getListRoomOfUser(session.account).subscribe(
        res=> {
          console.log(res);
          if (res.success) {
            this.listRooms= res.data;
          } else {
            //this.toastr.error('Đọc bài viết bị lỗi!')
          }

        });
    }

  }

  onCheckboxUser(event, value){
    if (event.target.checked) {
      this.lstChecked.push(value);
    }
    if (!event.target.checked) {
      let index = this.lstChecked.indexOf(value);
      if (index > -1) {
        this.lstChecked.splice(index, 1);
      }
    }
  }
  chatGroup() {
    if(this.lstChecked.length > 0){
      const currentUser = localStorage.getItem('currentUser');
      const session = deserialize(SessionVM, currentUser);
      const tokenProvider = new Chatkit.TokenProvider({
        url: 'https://momandbabyserveriuh.herokuapp.com/chat/auth',
        headers: {
          "x-api-key": "123@mom_and_baby_tool",
          "x-access-token": session.token
        }
      });
      const chatManager = new Chatkit.ChatManager({
        instanceLocator: 'v1:us1:d3b47aed-c439-4dc3-ae2a-06e6cf178edb',
        userId: session.account,
        tokenProvider
      });
      this._nameRoom += "[";
      this._nameRoom += session.account+",";
      this._nameRoom += this.lstChecked.toString();
      /*forEach(this.lstChecked, function(value, key){
        this._nameRoom += value;
      });*/
      this._nameRoom += "]";
      this.chatService.createRoom(session.account, this._nameRoom,this.lstChecked).subscribe(
        res=> {
          if (res.success) {
            ///
            return chatManager
              .connect()
              .then(currentUser => {
                currentUser.subscribeToRoom({
                  roomId: res.data.id,
                  messageLimit: 100,
                  hooks: {
                    onMessage: message => {
                      this.messages.push(message);
                    },
                    onPresenceChanged: (state, user) => {
                      this.users = currentUser.users.sort((a, b) => {
                        if (a.presence.state === 'online') return -1;

                        return 1;
                      });
                    },
                  },
                });
                this._nameRoom = "Room";
                this.getListRoomsOfUser();
                this.currentUser = currentUser;
                //this.users = currentUser.users;
                //this.roomId = roomId;
                //this.roomName = roomName;
              });
            ///////////
          } else {

          }

        });
    }

  }
}
