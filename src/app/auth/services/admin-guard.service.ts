import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {map, first} from 'rxjs/operators';
import {select, Store} from '@ngrx/store';
import {IAuthState} from '../store/auth.reducer';
import {getUser} from '../store/auth.selectors';
import {IUser} from '../models/user.model';

@Injectable()
export class AdminGuardService implements CanActivate {

    constructor(private router: Router, private store: Store<IAuthState>) {
    }

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
        return this.store.pipe(
            select(getUser),
            map(
                (user: IUser) => {
                    if (user.isAdmin) {
                        return true;
                    }
                    return false;
                }),
            first()
        );
    }
}
