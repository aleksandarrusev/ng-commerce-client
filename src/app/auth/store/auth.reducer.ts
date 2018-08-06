import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import {AuthActions, AuthActionTypes} from './auth.actions';
import {IUser} from '../models/user.model';

export interface AuthState {
  user: IUser | null;
}
export const initialAuthState: AuthState = {
    user: null,
};

export function authReducer(state = initialAuthState,
                            action: AuthActions): AuthState {
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
