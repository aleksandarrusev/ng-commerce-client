import { Action } from '@ngrx/store';
import {IProduct, Product} from '../models/product.model';

export enum ProductsActionTypes {
  FetchProductsByCategory = '[Category page] Fetch products by category',
  FilterProducts = '[Category page] Filter products',
  FetchLatestProducts = '[Home page] Fetch last 4 products',
  FetchSingleProduct = '[Product page] Fetch single product\'s information',
  ProductsFetchedSuccess = '[Category page] Products by category fetched successfully',
  LatestProductsFetchedSuccess = '[Home page] Latest 4 products loaded successfully',
  FilteredProductsFetchedSuccess = '[Category page] Filtered products by category fetched successfully',
  SingleProductFetchedSuccess = '[Product page] Single product fetched succesfully',
}

export class FetchProductsByCategoryAction implements Action {
  readonly type = ProductsActionTypes.FetchProductsByCategory;
  constructor(public payload: {category: string, qParams: any}) {}
}

export class FilterProductsAction implements Action {
    readonly type = ProductsActionTypes.FilterProducts;
    constructor(public payload: any) {}
}

export class FetchLatestProductsAction implements Action {
    readonly type = ProductsActionTypes.FetchLatestProducts;
    constructor() {}
}

export class FetchSingleProductAction implements Action {
    readonly type = ProductsActionTypes.FetchSingleProduct;
    constructor() {}
}

export class ProductsFetchedSuccessAction implements Action {
    readonly type = ProductsActionTypes.ProductsFetchedSuccess;
    constructor(public payload: IProduct[]) {}
}

export class LatestProductsFetchedSuccessAction implements Action {
    readonly type = ProductsActionTypes.LatestProductsFetchedSuccess;
    constructor(public payload: IProduct[]) {

    }
}

export class FilteredProductsFetchedSuccessAction implements Action {
    readonly type = ProductsActionTypes.FilteredProductsFetchedSuccess;
    constructor(public payload: IProduct[]) {}
}

export class SingleProductFetchedSuccessAction implements Action {
    readonly type = ProductsActionTypes.SingleProductFetchedSuccess;
    constructor(public payload: IProduct[]) {}
}


export type ProductsActions = FetchProductsByCategoryAction
| FilterProductsAction
| FetchLatestProductsAction
| FetchSingleProductAction
| ProductsFetchedSuccessAction
| LatestProductsFetchedSuccessAction
| FilteredProductsFetchedSuccessAction
| SingleProductFetchedSuccessAction;
