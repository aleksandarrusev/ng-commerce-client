import {
    ActionReducer,
    ActionReducerMap,
    createFeatureSelector,
    createSelector,
    MetaReducer
} from '@ngrx/store';
import {CartActions, CartActionTypes} from './cart.actions';
import {CartItem, ICartItem} from '../models/cart-item.model';
import {findIndex} from 'rxjs/operators';

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
            const updatedItem = action.payload.cartItem;

            return {
                cartTotal: state.cartTotal + updatedItem.product.price,
                cartItemsCount: state.cartItemsCount + 1,
                cartItems: [
                    ...state.cartItems,
                    updatedItem
                ]
            };

        case CartActionTypes.IncrementCartItemQty:
            const cartItemToIncrement = action.payload.cartItem;
            const cartItemToIncrementIndex = state.cartItems.indexOf(cartItemToIncrement);
            ;

            return {
                cartTotal: state.cartTotal + cartItemToIncrement.product.price,
                cartItemsCount: state.cartItemsCount + 1,
                cartItems: [
                    ...state.cartItems.slice(0, cartItemToIncrementIndex),
                    cartItemToIncrement,
                    ...state.cartItems.slice(cartItemToIncrementIndex + 1)
                ]
            };

        case CartActionTypes.DecrementCartItemQty:
            const cartItemToDecrement = action.payload.cartItem;
            const cartItemToDecrementIndex = state.cartItems.indexOf(cartItemToDecrement);


            return {
                cartTotal: state.cartTotal - cartItemToDecrement.product.price,
                cartItemsCount: state.cartItemsCount - 1,
                cartItems: [
                    ...state.cartItems.slice(0, cartItemToDecrementIndex),
                    cartItemToDecrement,
                    ...state.cartItems.slice(cartItemToDecrementIndex + 1)
                ]
            };
        case CartActionTypes.RemoveFromCart:
            const cartItemToRemove = action.payload.cartItem;
            const cartItemToRemoveIndex = state.cartItems.indexOf(cartItemToRemove);
            const cartItemToRemoveTotal = cartItemToRemove.qty * cartItemToRemove.product.price;

            return {
                cartTotal: state.cartTotal - cartItemToRemoveTotal,
                cartItemsCount: state.cartItemsCount - cartItemToRemove.qty,
                cartItems: [
                    ...state.cartItems.slice(0, cartItemToRemoveIndex),
                    ...state.cartItems.slice(cartItemToRemoveIndex + 1)
                ]
            }


        default:
            return state;
    }
}
