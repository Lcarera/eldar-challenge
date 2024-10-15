import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Publicacion } from '@domain/publicacion.class';
import { Usuario } from '@domain/usuario.class';

@Injectable({
  providedIn: 'root',
})
export class PublicacionService {
  private httpClient = inject(HttpClient);
  private publicaciones: WritableSignal<Publicacion[]> = signal([]);
  constructor() {}

  fetch(): void {
    this.httpClient
      .get<Publicacion[]>('https://jsonplaceholder.typicode.com/posts')
      .subscribe((res) => {
        const dataMapeada = res.map((item) => ({
          ...item,
          usuario: new Usuario(
            item.userId,
            item.userId.toString(),
          ),
        }));
        this.publicaciones.set(dataMapeada);
      });
  }

  getPublicaciones(): WritableSignal<Publicacion[]> {
    return this.publicaciones;
  }
}
