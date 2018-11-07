import { Component, OnInit, OnDestroy} from '@angular/core';
import { Post } from '../post.model'
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

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
totalPosts = 10;
postsPerPage = 2;
currentPage = 1;
pageSizeOptions = [1, 2, 5, 10];

ngOnInit() {
  this.postsService.getPosts(this.postsPerPage, this.currentPage);
  this.postsSub = this.postsService.getPostUpdateListener().subscribe((postData: {posts: Post[],postCount: number}) => {
    this.posts = postData.posts;
    this.totalPosts = postData.postCount;
  }); 
}

onDelete(postId : string) {
  this.postsService.deletePost(postId).subscribe(() => {
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
  });
}

onChangePage(pageData: PageEvent){
  this.currentPage = pageData.pageIndex + 1;
  this.postsPerPage = pageData.pageSize;
  this.postsService.getPosts(this.postsPerPage, this.currentPage);
}

ngOnDestroy() {
  this.postsSub.unsubscribe();
}
}
