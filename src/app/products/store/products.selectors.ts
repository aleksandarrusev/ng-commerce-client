import {createSelector} from '@ngrx/store';


export const selectProductsState = state => state.products;


export const getLatestProducts = createSelector(
  selectProductsState,
  products => products.latestProducts
);

export const getProductsByCategory = createSelector(
    selectProductsState,
    products => products.displayedProducts
);

//
// export const isLoggedOut = createSelector(
//     getLatestProducts,
//   loggedIn => !loggedIn
// );
