import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {AuthService} from '../../services/auth.service';
import {AuthActionTypes, Login, LoginFailed, LoginSuccess, Logout, SetUser} from './auth.actions';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import {IUser} from '../models/user.model';
import {defer, Observable, of} from 'rxjs';


@Injectable()
export class AuthEffects {
    get init$(): Observable<SetUser> {
        return this._init$;
    }

    set init$(value: Observable<SetUser>) {
        this._init$ = value;
    }

    @Effect()
    login$ = this.actions$.pipe(
        ofType<Login>(AuthActionTypes.Login),
        mergeMap((action) => {
            return this.authService.login(action.payload).pipe(
                catchError((error) => {
                   return of(new LoginFailed());
                }),
            );
        }),
        map((response: { token: String, user: IUser}) => {
            return new LoginSuccess(response.user);
        })
    );
    //
    @Effect({dispatch: false})
    logout$ = this.actions$.pipe(
        ofType<Logout>(AuthActionTypes.Logout),
        tap(() => {
            return this.authService.logout();
        })
    );
    @Effect() private _init$ = defer(() => {
        const user = this.authService.getTokenData();

        if (user) {
            return of(new SetUser(user));
        } else {
            return of(new Logout());
        }

    });

    constructor(private actions$: Actions, private authService: AuthService) {

    }

}
