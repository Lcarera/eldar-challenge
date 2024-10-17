import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { User } from '@domain/user.class';
import { Role } from '@domain/role.enum';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usuarios = [
    new User(1, 'admin@eldar.com', 'admin123', Role.ADMIN),
    new User(2, 'user@eldar.com', 'usuario123', Role.USER),
  ];

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor() {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const user = JSON.parse(storedUser) as User;
      this.currentUserSubject.next(user);
      this.isLoggedInSubject.next(true);
    }
  }

  login$(email: string, password: string): Observable<User> {
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

  getUserById(id: number): User | null {
    const user = this.usuarios.find((u) => u.id === id);
    return user || null;
  }

  public checkIfUserIsAdmin(): boolean {
    let isAdmin = false;
    this.currentUser$.subscribe((user) => {
      if (!user) return;
      isAdmin = user.role === Role.ADMIN;
    });
    return isAdmin;
  }
}
