import { Action } from '@ngrx/store';
import {IUser} from '../models/user.model';
import {ILoginRequest} from '../models/login-request.model';

export enum AuthActionTypes {
  Login = '[Auth] LoginAction request sent',
  SetUser = '[Auth] Set logged in user if token is available',
  LoginSuccess = '[Auth] LoginAction successful',
  LoginFailed = '[Auth] LoginAction failed',
  Logout = '[Auth] Logout'
}

export class LoginAction implements Action {
  readonly type = AuthActionTypes.Login;

    constructor(public payload: ILoginRequest ) {}
}

export class SetUserAction implements Action {
    readonly type = AuthActionTypes.SetUser;

    constructor(public payload: IUser ) {}
}


export class LoginSuccessAction implements Action {
    readonly type = AuthActionTypes.LoginSuccess;

    constructor(public payload: IUser) {}
}

export class LoginFailedAction implements Action {
    readonly type = AuthActionTypes.LoginFailed;
}

export class LogoutAction implements Action {
    readonly type = AuthActionTypes.Logout;
}

export type AuthActions = LoginAction | LoginSuccessAction | LoginFailedAction |  LogoutAction | SetUserAction ;
