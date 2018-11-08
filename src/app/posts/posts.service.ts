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
    private postsUpdated = new Subject<{posts: Post[], postCount: number}>()

    constructor(private http: HttpClient, private router: Router){}

    getPosts(postsPerPage: number, currentPage: number) {
        const queryParams = `?pageSize=${postsPerPage}&page=${currentPage}`
        this.http.get<{message:string, posts: Post[], maxPosts:number}>('http://localhost:3000/posts' + queryParams)
        .subscribe((postData) => {
            this.posts = postData.posts;
            this.postsUpdated.next({posts: [...this.posts],postCount: postData.maxPosts});
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
            this.router.navigate(['/']);
        });
        
    }

    deletePost(postId: string) {
        return this.http.delete("http://localhost:3000/posts/" + postId);
    }

    getPost(id: string) {
        return this.http.get<Post>("http://localhost:3000/posts/" + id);
    }

    updatePost(postId: string, title: string, content: string, image: File | string){
        let postData: Post | FormData;
        if (typeof(image) === 'object') {
            postData = new FormData();
            postData.append("title", title);
            postData.append("content", content);
            postData.append("image", image, title);
            postData.append("_id", postId);
        } else {
            postData = {
                _id: postId,
                title: title,
                content: content,
                imagePath: image,
                creator: null
            }
        }
        this.http.put<{message: string, imagePath: string}>("http://localhost:3000/posts/" + postId, postData).subscribe(response => {
            this.router.navigate(['/']);
        });
    }
}