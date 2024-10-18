import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Post } from '@domain/post.class';
import { User } from '@domain/user.class';
import { AuthService } from '@services/auth/auth.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private httpClient = inject(HttpClient);
  private authService = inject(AuthService);

  private postsSubject = new BehaviorSubject<Post[] | []>([]);
  public posts$ = this.postsSubject.asObservable();
  constructor() {}

  fetch(): void {
    this.httpClient
      .get<Post[]>('https://jsonplaceholder.typicode.com/posts')
      .subscribe((res) => {
        const dataMapeada = res.map((item) => ({
          ...item,
          user:
            this.authService.getUserById(item.userId) ??
            new User(item.userId, `invitado-${item.userId}@yahoo.com`),
        }));
        this.postsSubject.next(dataMapeada);
      });
  }

  getPostById(id: number): Post | null {
    let post = null;
    this.posts$.subscribe((posts) => {
      if (!posts) return;
      post = posts.find((p) => p.id === id);
    });
    return post || null;
  }

  savePost(post: Post): void {
    post.user = this.authService.getCurrentUser()!;
    post.userId = post.user.id;
    this.httpClient
      .post<Post>('https://jsonplaceholder.typicode.com/posts', post)
      .subscribe((res) => {
        const currentPosts = this.postsSubject.value;
        this.postsSubject.next([...currentPosts, res]);
      });
  }

  updatePost(post: Post): void {
    post.user = this.authService.getUserById(post.userId) ??
    new User(post.userId, `invitado-${post.userId}@yahoo.com`),
    this.httpClient
      .put<Post>(`https://jsonplaceholder.typicode.com/posts/${post.id}`, post)
      .subscribe((res) => {
        this.postsSubject.next(
          this.postsSubject.value.map((p) => (p.id === res.id ? res : p))
        );
      });
  }
}
