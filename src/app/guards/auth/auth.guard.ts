import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../../auth/services/token.service';

export const authGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);

  if (tokenService.isTokenValid()) {
    return true; // Allow access if the token is valid
  } else {
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } }); // Redirect to login if not authenticated
    return false;
  }
};
