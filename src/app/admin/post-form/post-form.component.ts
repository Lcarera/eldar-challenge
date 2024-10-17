import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '@services/notification.service';
import { PostService } from '@services/post/post.service';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.scss',
})
export class PostFormComponent {
  modo!: 'agregar' | 'editar';
  postForm!: FormGroup;

  private route = inject(ActivatedRoute);
  private postService = inject(PostService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private notificationService = inject(NotificationService);

  constructor() {}

  ngOnInit() {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.modo = 'editar';
      const post = this.postService.getPostById(Number(id));
      if (post) {
        this.postForm.patchValue({
          title: post.title,
          body: post.body,
        });
      } else {
        this.notificationService.showError('No se encontro la publicacion');
        this.router.navigate(['/dashboard']);
        return;
      }
    } else {
      this.modo = 'agregar';
    }
  }
  /*  onSubmit() {
    if (this.modo === 'agregar') {
      this.postService.agregarEntidad(this.postForm.value).subscribe();
    } else {
      this.postService.editarEntidad(this.postForm.value).subscribe();
    }
  } */
}
