import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import {AuthActions, AuthActionTypes} from './auth.actions';
import {IUser} from '../models/user.model';

export interface IAuthState {
  user: IUser | null;
}
export const initialAuthState: IAuthState = {
    user: null,
};

export function authReducer(state = initialAuthState,
                            action: AuthActions): IAuthState {
    switch (action.type) {

        case AuthActionTypes.LoginSuccess:
            return {
                user: action.payload
            };

        case AuthActionTypes.SetUser:
            return {
                user: action.payload
            };

        case AuthActionTypes.Logout:
            return {
                user: null,
            };

        default:
            return state;
    }
}
