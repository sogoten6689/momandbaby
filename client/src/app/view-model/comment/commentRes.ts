import {UserResModel} from '../user/user-res-model';

export class CommentModelRes {
  id:number
  topic_id: number;
  content: string;
  user: {id:number;fullname:string};

}
