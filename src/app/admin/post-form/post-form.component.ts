import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NotificationService } from '@services/notification.service';
import { PostService } from '@services/post/post.service';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [
    ButtonModule,
    InputTextModule,
    CommonModule,
    ReactiveFormsModule,
    InputTextareaModule,
    RouterLink,
  ],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.scss',
})
export class PostFormComponent {
  modo!: 'agregar' | 'editar';
  postForm!: FormGroup;
  submitted = false;
  loading = false;

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
      id: [0],
      userId: [0],
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.modo = 'editar';
      const post = this.postService.getPostById(Number(id));
      if (post) {
        this.postForm.patchValue({
          title: post.title,
          body: post.body,
          id: post.id,
          userId: post.userId,
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
  onSubmit() {
    this.submitted = true;
    if (this.postForm.invalid) {
      return;
    }
    this.loading = true;

    if (this.modo === 'agregar') {
      this.postService.savePost(this.postForm.value).subscribe({
        next: () => {
          this.loading = false;
          this.notificationService.showSuccess('Publicación guardada');
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.loading = false;
          this.notificationService.showError('Error al guardar la publicación');
          console.error('Error al guardar la publicación:', err);
        }
      });
    } else {
      this.postService.updatePost(this.postForm.value).subscribe({
        next: () => {
          this.loading = false;
          this.notificationService.showSuccess('Publicación actualizada');
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.loading = false;
          this.notificationService.showError('Error al actualizar la publicación');
          console.error('Error al actualizar la publicación:', err);
        }
      });
    }
  }
}
