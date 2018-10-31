import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {AuthService} from '../services/auth.service';
import {AuthActionTypes, LoginAction, LoginFailedAction, LoginSuccessAction, LogoutAction, SetUserAction} from './auth.actions';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import {IUser} from '../models/user.model';
import {defer, Observable, of} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Store} from '@ngrx/store';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {JwtHelperService} from '@auth0/angular-jwt';
import {HttpClient} from '@angular/common/http';
import {IAuthState} from './auth.reducer';


@Injectable()
export class AuthEffects {
    get init$(): Observable<SetUserAction> {
        return this._init$;
    }

    set init$(value: Observable<SetUserAction>) {
        this._init$ = value;
    }


    @Effect()
    // login$ = this.actions$.pipe(
    //     ofType<LoginAction>(AuthActionTypes.Login),
    //     mergeMap(({payload}) => {
    //
    //         const userCredentials = {
    //             email: payload.userCredentials.email,
    //             password: payload.userCredentials.password,
    //         }
    //
    //
    //         // return this.authService.login(action.payload).pipe(
    //         //     catchError((error) => {
    //         //         return of(new LoginFailedAction());
    //         //     }),
    //         // );
    //     }),
    //     map((response: { token: String, user: IUser }) => {
    //         return new LoginSuccessAction(response.user);
    //     })
    // );
    //
    @Effect() private _init$ = defer(() => {
        const user = this.authService.getTokenData();

        if (user) {
            return of(new SetUserAction(user));
        } else {
            return of(new LogoutAction());
        }

    });

    constructor(private actions$: Actions,
                private authService: AuthService,
                private router: Router,
                private http: HttpClient,
                private toastrService: ToastrService) {

    }

}
