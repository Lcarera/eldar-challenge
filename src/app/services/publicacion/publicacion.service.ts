import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Publicacion } from '@domain/publicacion.class';
import { Usuario } from '@domain/usuario.class';
import { AuthService } from '@services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class PublicacionService {
  private httpClient = inject(HttpClient);
  private authService = inject(AuthService);
  private publicaciones: WritableSignal<Publicacion[]> = signal([]);
  constructor() {}

  fetch(): void {
    this.httpClient
      .get<Publicacion[]>('https://jsonplaceholder.typicode.com/posts')
      .subscribe((res) => {
        const dataMapeada = res.map((item) => ({
          ...item,
          usuario: this.authService.getUserById(item.userId) ?? new Usuario(item.userId, `invitado-${item.userId}@yahoo.com`),
        }));
        this.publicaciones.set(dataMapeada);
      });
  }

  getPublicaciones(): WritableSignal<Publicacion[]> {
    return this.publicaciones;
  }
}
