import {createSelector} from '@ngrx/store';


export const selectCartState = state => state.cart;


export const getCartItems = createSelector(
    selectCartState,
  cart => cart.cartItems
);

export const getAllCartInfo = createSelector(
    selectCartState,
    cart => cart
);


export const getCartItemsCount = createSelector(
    selectCartState,
    cart => cart.cartItemsCount
);
