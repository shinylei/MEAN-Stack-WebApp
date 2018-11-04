import { Component, OnInit, OnDestroy} from '@angular/core';
import { Post } from '../post.model'
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy{
// posts = [
//   {title: 'First Post', content: 'This is first post'},
//   {title: 'Second Post', content: 'This is second post'},
//   {title: 'Third Post', content: 'This is third post'},
// ];
constructor(public postsService : PostsService) {}

posts :Post[] = [];
private postsSub : Subscription;

ngOnInit() {
  this.postsService.getPost();
  this.postsSub = this.postsService.getPostUpdateListener().subscribe((posts: Post[]) => {
    this.posts = posts;
  });
  
}

ngOnDestroy() {
  this.postsSub.unsubscribe();
}
}
