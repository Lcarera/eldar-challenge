import { inject, Injectable, Signal } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '@services/auth/auth.service';

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
    const isLoggedIn = this.authService.isLoggedIn();
    if (state.url === '/login' && isLoggedIn) {
      this.router.navigate(['/dashboard']);
      return false;
    }

    if (!isLoggedIn) {
      console.log('no');
      return this.router.navigate(['/login']).then(() => false);
    }
    return true;
  }
}
