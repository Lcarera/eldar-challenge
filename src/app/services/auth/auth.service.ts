import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { Usuario } from '@domain/usuario.class';
import { Rol } from '@domain/rol.enum';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usuarios = [
    new Usuario(1, 'admin@eldar.com', 'admin123', Rol.ADMIN),
    new Usuario(2, 'usuario@eldar.com', 'usuario123', Rol.USER),
  ];

  private currentUserSubject = new BehaviorSubject<Usuario | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor() {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const user = JSON.parse(storedUser) as Usuario;
      this.currentUserSubject.next(user);
      this.isLoggedInSubject.next(true);
    }
  }

  login$(email: string, password: string): Observable<Usuario> {
    console.log(this.usuarios);
    const user = this.usuarios.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      this.currentUserSubject.next(user);
      this.isLoggedInSubject.next(true);
      localStorage.setItem('currentUser', JSON.stringify(user));
      return of(user);
    }
    return throwError(() => new Error('Credenciales incorrectas'));
  }

  logout(): void {
    this.currentUserSubject.next(null);
    this.isLoggedInSubject.next(false);
    localStorage.removeItem('currentUser');
  }
}
