import {
    ActionReducer,
    ActionReducerMap,
    createFeatureSelector,
    createSelector,
    MetaReducer
} from '@ngrx/store';
import {ProductsActions, ProductsActionTypes} from './products.actions';
import {IProduct} from '../models/product.model';

export interface IProductsState {
    latestProducts: IProduct[];
    displayedProducts: IProduct[];
}

export const initialProductsState: IProductsState = {
    latestProducts: [],
    displayedProducts: []
};

export function productsReducer(state = initialProductsState,
                                action: ProductsActions): IProductsState {
    switch (action.type) {

        case ProductsActionTypes.LatestProductsFetchedSuccess:
            return {
                ...state,
                latestProducts: action.payload
            };

        case ProductsActionTypes.ProductsFetchedSuccess:
            return {
                ...state,
                displayedProducts: action.payload
            };

        default:
            return state;
    }
}
