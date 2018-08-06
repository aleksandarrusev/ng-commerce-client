import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {map, first} from 'rxjs/operators';
import {select, Store} from '@ngrx/store';
import {AuthState} from '../store/auth.reducer';
import {getUser} from '../store/auth.selectors';

@Injectable()
export class GuestGuardService implements CanActivate {

    constructor(private router: Router, private store: Store<AuthState>) {
    }

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
        return this.store.pipe(
            select(getUser),
            map((user) => {
                if (user) {
                    this.router.navigate(['/']);
                    return false;
                }
                return true;
            }),
        );
    }
}
