import { Action } from '@ngrx/store';
import {IUser} from '../models/user.model';
import {ILoginRequest} from '../models/login-request.model';

export enum AuthActionTypes {
  Login = '[Auth] Login request sent',
  SetUser = '[Auth] Set logged in user if token is available',
  LoginSuccess = '[Auth] Login successful',
  LoginFailed = '[Auth] Login failed',
  Logout = '[Auth] Load Auths'
}

export class Login implements Action {
  readonly type = AuthActionTypes.Login;

    constructor(public payload: ILoginRequest ) {}
}

export class SetUser implements Action {
    readonly type = AuthActionTypes.SetUser;

    constructor(public payload: IUser ) {}
}


export class LoginSuccess implements Action {
    readonly type = AuthActionTypes.LoginSuccess;

    constructor(public payload: IUser) {}
}

export class LoginFailed implements Action {
    readonly type = AuthActionTypes.LoginFailed;
}
export class Logout implements Action {
    readonly type = AuthActionTypes.Logout;
}

export type AuthActions = Login | LoginSuccess | LoginFailed |  Logout | SetUser;
