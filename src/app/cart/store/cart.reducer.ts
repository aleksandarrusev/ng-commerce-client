import {
    ActionReducer,
    ActionReducerMap,
    createFeatureSelector,
    createSelector,
    MetaReducer
} from '@ngrx/store';
import {CartActions, CartActionTypes} from './cart.actions';
import {CartItem, ICartItem} from '../models/cart-item.model';

export interface ICartState {
    cartItems: ICartItem[];
    cartItemsCount: number;
    cartTotal: number;
}

export const initialCartState: ICartState = {
    cartItems: [],
    cartItemsCount: 0,
    cartTotal: 0,
};

export function cartReducer(state = initialCartState,
                            action: CartActions): ICartState {
    switch (action.type) {

        case CartActionTypes.AddToCart:
            const updatedCartItems = action.payload;

            return {
                ...state,
                cartItemsCount: state.cartItemsCount + 1,
                cartItems: [
                    ...updatedCartItems
                ]
            };

        case CartActionTypes.IncrementCartItemQty:
            const cartItemToIncrement = action.payload;

            const updatedCartItemsArrayIncr = state.cartItems.map((item) => {
                if (item === cartItemToIncrement) {
                    item.qty += 1;
                }
                return item;
            });

            return {
                ...state,
                cartTotal: state.cartTotal + cartItemToIncrement.product.price,
                cartItemsCount: state.cartItemsCount + 1,
                cartItems: [
                    ...updatedCartItemsArrayIncr
                ]
            };

        case CartActionTypes.DecrementCartItemQty:
            const cartItemToDecrement = action.payload;

            const updatedCartItemsDecr = state.cartItems.map((item) => {
                if (item === cartItemToIncrement && item.qty < 1) {
                    item.qty -= 1;
                }
                return item;
            });

            return {
                ...state,
                cartTotal: state.cartTotal - cartItemToIncrement.product.price,
                cartItemsCount: state.cartItemsCount - 1,
                cartItems: [
                    ...updatedCartItemsDecr
                ]
            };


        default:
            return state;
    }
}
