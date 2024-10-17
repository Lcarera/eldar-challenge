import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '@services/auth/auth.service';
import { map, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private authService = inject(AuthService);
  private router = inject(Router);
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): MaybeAsync<GuardResult> {
    return this.authService.isLoggedIn$.pipe(
      take(1),
      map((isLoggedIn) => {
        if (state.url === '/login' && isLoggedIn) {
          this.router.navigate(['/dashboard']);
          return false;
        }
        if (!isLoggedIn && state.url !== '/login') {
          this.router.navigate(['/login']);
          return false;
        }
        return true;
      })
    );
  }
}
