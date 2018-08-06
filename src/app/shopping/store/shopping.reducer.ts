import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import {ShoppingActions, ShoppingActionTypes} from './shopping.actions';

export interface ShoppingState {
  showProducts: boolean;
}
export const initialAuthState: ShoppingState = {
    showProducts: false
};

export function shoppingReducer(state = initialAuthState,
                            action: ShoppingActions): ShoppingState {
    switch (action.type) {

        case ShoppingActionTypes.ShowProducts:
            return {
                showProducts: true
            };

        default:
            return state;
    }
}
