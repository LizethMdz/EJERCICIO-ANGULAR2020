import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanLoad,
  Route,
  UrlSegment,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private usuarioService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (
      this.usuarioService.autenticado ||
      localStorage.getItem('msm') === 'true'
    ) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
