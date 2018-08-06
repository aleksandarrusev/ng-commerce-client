import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';
import {map, first, mergeMap} from 'rxjs/operators';
import {AuthState} from './store/auth.reducer';
import {select, Store} from '@ngrx/store';
import {getUser} from './store/auth.selectors';

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(public authService: AuthService, private store: Store<AuthState>, public router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): Observable<boolean> {
        return this.store.pipe
        (   select(getUser),
            map((user) => {
                if (user) {
                    return true;
                }
                this.router.navigate(['/login'], {queryParams: {returnUrl: routerState.url}});
                return false;
            }), first());
    }
}
