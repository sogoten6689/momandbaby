export class CommentModel {
  user_id: number;
  topic_id: number;
  content: string;

  constructor() {
    this.content = "";
    this.topic_id = null;
    this.user_id = null;
  }
}
