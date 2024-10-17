import { Component, inject, OnInit } from '@angular/core';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { Post } from '@domain/post.class';
import { PostService } from '@services/post/post.service';
import { AuthService } from '@services/auth/auth.service';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    InputTextModule,
    InputIconModule,
    IconFieldModule,
  ],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss',
})
export class DataTableComponent implements OnInit {
  constructor() {}

  private postService = inject(PostService);
  private authService = inject(AuthService);

  public posts: Post[] = [];
  public currentUserIsAdmin: boolean = false;

  ngOnInit(): void {
    this.postService.fetch();
    this.currentUserIsAdmin = this.authService.checkIfUserIsAdmin();
    this.postService.posts$.subscribe((posts) => (posts ? this.posts = posts : []));
  }

  public filtroEvento(event: any): string {
    if (event.target) return event.target.value;
    return '';
  }
}
