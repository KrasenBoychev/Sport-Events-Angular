import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { UserService } from '../user/user.service';

export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const userService = inject(UserService);
  const router = inject(Router);

  const userLocalStorage = localStorage.getItem('user');

  if (userService.isLogged || userLocalStorage) {
    return true;
  }

  router.navigate(['/home']);
  return false;
};

export const LoggedInGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const userService = inject(UserService);
  const router = inject(Router);

  const userLocalStorage = localStorage.getItem('user');

  if (userService.isLogged || userLocalStorage) {
    router.navigate(['/home']);
    return false;
  }

  return true;
};

