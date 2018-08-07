import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import {ProductsActions, ProductsActionTypes} from './products.actions';
import {IProduct} from '../models/product.model';

export interface IShoppingState {
  latestProducts: IProduct[];
}
export const initialProductsState: IShoppingState = {
    latestProducts: []
};

export function productsReducer(state = initialProductsState,
                                action: ProductsActions): IShoppingState {
    switch (action.type) {

        case ProductsActionTypes.LatestProductsFetchedSuccess:
            return {
                latestProducts: action.payload
            };

        default:
            return state;
    }
}
