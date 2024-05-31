import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { Post } from './post.model';

import { envionment } from '../../environments/environment';

const BACKEND_URL = envionment.apiUrl + 'posts/';

@Injectable({ providedIn: 'root' })
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<{ posts: Post[]; postCount: number }>();

  constructor(private http: HttpClient, private router: Router) {}

  //Subscritption (Subject) that tells components that posts have been updated
  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getPosts(postPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${postPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        BACKEND_URL + queryParams
      )
      .pipe(
        map((postData) => {
          return {
            posts: postData.posts.map(
              (post: {
                title: string;
                content: string;
                _id: string;
                imagePath: string;
                creator: string;
              }) => {
                return {
                  title: post.title,
                  content: post.content,
                  id: post._id,
                  imagePath: post.imagePath,
                  creator: post.creator,
                };
              }
            ),
            maxPosts: postData.maxPosts,
          };
        })
      )
      .subscribe((transformedPostData) => {
        // console.log(transformedPostData);
        this.posts = transformedPostData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: transformedPostData.maxPosts,
        });
      });

    // return [...this.posts];
  }

  addPost(title: string, content: string, image: File) {
    const postData = new FormData();
    postData.append('title', title);
    postData.append('content', content);
    postData.append('image', image, title);
    this.http
      .post<{ post: Post; message: string }>(BACKEND_URL, postData)
      .subscribe((resData) => {
        this.router.navigate(['/']);
      });
  }

  deletePost(postId: string) {
    return this.http.delete(BACKEND_URL + postId);
  }

  getPost(id: string) {
    return this.http.get<{
      _id: string;
      title: string;
      content: string;
      imagePath: string;
      creator: string;
    }>(BACKEND_URL + id);
  }

  updatePost(id: string, title: string, content: string, image: File | string) {
    let postData: Post | FormData;
    if (typeof image === 'object') {
      postData = new FormData();
      postData.append('id', id);
      postData.append('title', title);
      postData.append('content', content);
      postData.append('image', image, title);
    } else {
      postData = {
        id: id,
        title: title,
        content: content,
        imagePath: image,
        creator: null,
      };
    }

    this.http.put(BACKEND_URL + id, postData).subscribe((response: any) => {
      this.router.navigate(['/']);
    });
  }
}
