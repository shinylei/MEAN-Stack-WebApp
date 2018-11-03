import { Component, EventEmitter, Output } from '@angular/core';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent{
  enteredTitle='';
  enteredContent='';
  @Output()
  postAdded = new EventEmitter<Post>();

  onAddPost() {
    var post : Post = {
      title: this.enteredTitle,
      content: this.enteredContent
    }
    this.postAdded.emit(post);
  }
}
