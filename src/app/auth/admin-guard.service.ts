import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';
import {map, first} from 'rxjs/operators';

@Injectable()
export class AdminGuardService implements CanActivate {

  constructor(public authService: AuthService, public router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.authService.authState$.pipe
    (map(((user) => {
      if (user.isAdmin) {
        return true;
      }
      return false;
    })), first());
  }
}
