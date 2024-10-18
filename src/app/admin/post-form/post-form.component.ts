import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '@services/notification.service';
import { PostService } from '@services/post/post.service';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [ButtonModule, InputTextModule, CommonModule, ReactiveFormsModule, InputTextareaModule],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.scss',
})
export class PostFormComponent {
  modo!: 'agregar' | 'editar';
  postForm!: FormGroup;
  submitted = false;

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
  onSubmit() {
    this.submitted = true;

    if (this.postForm.invalid) {
      return;
    }

    if (this.modo === 'agregar') {
      this.postService.savePost(this.postForm.value);
    } else {
      this.postService.updatePost(this.postForm.value);
    }
    this.notificationService.showSuccess('Publicación guardada');
    this.router.navigate(['/dashboard']);
  }
}
