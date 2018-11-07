import { Post } from "./post.model";
import { Injectable } from "@angular/core";
import {Subject} from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root',
})
export class PostsService{
    private posts : Post[] = [];
    private postsUpdated = new Subject<Post[]>()

    constructor(private http: HttpClient, private router: Router){}

    getPosts() {
        this.http.get<{message:string, posts: Post[]}>('http://localhost:3000/posts')
        .subscribe((postData) => {
            this.posts = postData.posts;
            this.postsUpdated.next([...this.posts]);
        });
        
    }

    getPostUpdateListener() {
        return this.postsUpdated.asObservable();
    }

    addPost (title:string, content:string, image: File) {
        const postData = new FormData();
        postData.append("title", title);
        postData.append("content", content);
        postData.append("image", image, title);

        this.http.post<{message:string, post: Post}>('http://localhost:3000/posts', postData).subscribe((responseData) => {
            const post = {_id: responseData.post._id, title: title, content: content, imagePath: responseData.post.imagePath};
            this.posts.push(post);
            this.postsUpdated.next([...this.posts]);
            this.router.navigate(['/']);
        });
        
    }

    deletePost(postId: string) {
        this.http.delete("http://localhost:3000/posts/" + postId).subscribe(() => {
            const updatedPosts = this.posts.filter((post) => post._id != postId);
            this.posts = updatedPosts;
            this.postsUpdated.next([...this.posts]);
        });
    }

    getPost(id: string) {
        return this.http.get<Post>("http://localhost:3000/posts/" + id);
    }

    updatePost(postId: string, title: string, content: string){
        const updatedPost: Post = {
            _id:postId,
            title: title,
            content: content,
            imagePath: null,
        };
        this.http.put("http://localhost:3000/posts/" + postId, updatedPost).subscribe(response => {
            const updatedPosts = [...this.posts];
            const index = updatedPosts.findIndex(p => p._id === postId);
            updatedPosts[index] = updatedPost;
            this.posts = updatedPosts;
            this.postsUpdated.next([...this.posts]);
            this.router.navigate(['/']);
        });
    }
}