import {createSelector} from '@ngrx/store';


export const selectCartState = state => state.cart;


export const getAllCartItems = createSelector(
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
export const getCartTotal = createSelector(
    selectCartState,
    cart => cart.cartTotal
);
