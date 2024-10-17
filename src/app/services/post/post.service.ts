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

  private postsSubject = new BehaviorSubject<Post[] | null>(null);
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
}
