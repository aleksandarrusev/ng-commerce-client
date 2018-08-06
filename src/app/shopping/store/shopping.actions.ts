import { Action } from '@ngrx/store';

export enum ShoppingActionTypes {
  ShowProducts = '[Auth] Show Products',
}
git
export class ShowProducts implements Action {
  readonly type = ShoppingActionTypes.ShowProducts;
}

export type ShoppingActions = ShowProducts;
