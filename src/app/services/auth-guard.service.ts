import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(public authService: AuthService, public router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    let loggedIn = false;
    this.authService.authStatus.subscribe((user) => {
      if (user) {
        loggedIn = true;
      }
    });
    this.router.navigate(['/login']);
    return loggedIn;
  }
}
