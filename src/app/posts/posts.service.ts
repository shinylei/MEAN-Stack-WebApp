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
        this.http.get<{message:string, posts: Post[]}>('http://localhost:3000/posts')
        .subscribe((postData) => {
            this.posts = postData.posts;
            this.postsUpdated.next([...this.posts]);
        });
        
    }

    getPostUpdateListener() {
        return this.postsUpdated.asObservable();
    }

    addPost (title:string, content:string) {
        const post: Post = {_id: 'id', title: title, content: content};
        this.http.post<{message:string, postId: string}>('http://localhost:3000/posts', post).subscribe((responseData) => {
            post._id = responseData.postId;
            console.log(responseData);
            this.posts.push(post);
            this.postsUpdated.next([...this.posts]);
        });
        
    }

    deletePost(postId: string) {
        this.http.delete("http://localhost:3000/posts/" + postId).subscribe(() => {
            const updatedPosts = this.posts.filter((post) => post._id != postId);
            this.posts = updatedPosts;
            this.postsUpdated.next([...this.posts]);
        });
    }

    getPostById(id: string) {
        return {...this.posts.find(post => post._id === id)};
    }

    updatePost(postId: string, title: string, content: string){
        const updatedPost: Post = {
            _id:postId,
            title: title,
            content: content
        };
        this.http.put("http://localhost:3000/posts/" + postId, updatedPost).subscribe(response => {
            const updatedPosts = [...this.posts];
            const index = updatedPosts.findIndex(p => p._id === postId);
            updatedPosts[index] = updatedPost;
            this.posts = updatedPosts;
            this.postsUpdated.next([...this.posts]);
        });
    }
}