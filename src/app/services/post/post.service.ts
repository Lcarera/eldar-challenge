import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Post } from '@domain/post.class';
import { User } from '@domain/user.class';
import { AuthService } from '@services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private httpClient = inject(HttpClient);
  private authService = inject(AuthService);
  private posts: WritableSignal<Post[]> = signal([]);
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
        this.posts.set(dataMapeada);
      });
  }

  getPostes(): WritableSignal<Post[]> {
    return this.posts;
  }
}
