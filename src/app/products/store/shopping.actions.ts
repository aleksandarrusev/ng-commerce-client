import { Action } from '@ngrx/store';

export enum ShoppingActionTypes {
  FetchProductsByCategory = '[Category page] Fetch products by category',
  FilterProducts = '[Category page] Filter products',
  FetchLatestProducts = '[Home page] Fetch last 4 products',
  LoadSingleProduct = '[Product page] Loads single product\'s information',
}

export class FetchProductsByCategoryAction implements Action {
  readonly type = ShoppingActionTypes.FetchProductsByCategory;
  constructor() {}
}

export type ShoppingActions = FetchProductsByCategoryAction;
