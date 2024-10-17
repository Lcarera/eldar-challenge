import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Usuario } from '@domain/usuario.class';
import { Rol } from '@domain/rol.enum';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<Usuario | null>(null);
  public currentUser$: Observable<Usuario | null> =
    this.currentUserSubject.asObservable();

  constructor() {}

  login(email: string, password: string): void {
    if (email === 'admin@eldar.com' && password === 'admin123') {
      const user = new Usuario(1, 'admin@eldar.com', 'admin123', Rol.ADMIN);
      this.currentUserSubject.next(user); // Notifica a los suscriptores
    } else if (email === 'usuario@eldar.com' && password === 'usuario123') {
      const user = new Usuario(2, 'usuario@eldar.com', 'usuario123', Rol.USER);
      this.currentUserSubject.next(user);
    } else {
      this.currentUserSubject.next(null); // Notifica a los suscriptores que el usuario no está logueado
      throw new Error('Credenciales incorrectas');
    }
  }

  isLoggedIn(): Observable<boolean> {
    return this.currentUser$.pipe(map((user) => !!user)); // Observa si hay un usuario autenticado
  }

  getCurrentUser(): Observable<Usuario | null> {
    return this.currentUser$; // Devuelve un observable del usuario actual
  }
}
