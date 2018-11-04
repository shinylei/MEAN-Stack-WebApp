import { Post } from "./post.model";
import { Injectable } from "@angular/core";
import {Subject} from 'rxjs';
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root',
})
export class PostsService{
    private posts : Post[] = [];
    private postsUpdated = new Subject<Post[]>()

    constructor(private http: HttpClient){}

    getPost() {
        this.http.get<{message:string, posts: Post[]}>('http://localhost:3000/posts').subscribe((postData) => {
            this.posts = postData.posts;
            this.postsUpdated.next([...this.posts]);
        });
        
    }

    getPostUpdateListener() {
        return this.postsUpdated.asObservable();
    }

    addPost (title:string, content:string) {
        const post: Post = {id: 'id', title: title, content: content};
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
    }
}