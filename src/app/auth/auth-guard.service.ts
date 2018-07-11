import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';
import {map, first} from 'rxjs/operators';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(public authService: AuthService, public router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): Observable<boolean> {
    return this.authService.authStatus.pipe
    (map(((user) => {
      if (user) {
        return true;
      }
      this.router.navigate(['/login'], { queryParams: { returnUrl: routerState.url }});
      return false;
    })), first());
  }
}
