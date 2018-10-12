import { Action } from '@ngrx/store';
import {CartItem, ICartItem} from '../models/cart-item.model';
import {IProduct} from '../../products/models/product.model';

export enum CartActionTypes {
  AddToCart = '[Cart] Add to cart',
  IncrementCartItemQty = '[Cart] Increment Cart Item qty',
  DecrementCartItemQty = '[Cart] Decrement Cart Item qty',
  RemoveFromCart = '[Cart] Remove form cart',
  IncrementCartItemsCount = '[Cart] Increment Cart Count',
  DecrementCartItemsCount = '[Cart] Decrement Cart Count',
  IncreaseTotalCost = '[Cart] Increase Total cost',
  DecreaseTotalCost = '[Cart] Decrease Total cost',
  EmptyCart = '[Cart] Empty cart',

}

export class AddToCartAction implements Action {
  readonly type = CartActionTypes.AddToCart;
  constructor(public payload: ICartItem[]) {}
}
//
export class IncrementCartItemQtyAction implements Action {
    readonly type = CartActionTypes.IncrementCartItemQty;
    constructor(public payload: ICartItem) {}
}
export class DecrementCartItemQtyAction implements Action {
    readonly type = CartActionTypes.DecrementCartItemQty;
    constructor(public payload: ICartItem) {}
}
export class RemoveFromCartAction implements Action {
    readonly type = CartActionTypes.RemoveFromCart;
    constructor(public payload: {cartItem: CartItem}) {}
}
export class IncrementCartItemsCountAction implements Action {
    readonly type = CartActionTypes.IncrementCartItemsCount;
    constructor() {}
}
export class DecrementCartItemsCountAction implements Action {
    readonly type = CartActionTypes.DecrementCartItemsCount;
    constructor() {}
}
export class IncreaseTotalCostAction implements Action {
    readonly type = CartActionTypes.IncreaseTotalCost;
    constructor(public payload: number) {}
}
export class DecreaseTotalCostAction implements Action {
    readonly type = CartActionTypes.DecreaseTotalCost;
    constructor(public payload: number) {}
}
export class EmptyCartAction implements Action {
    readonly type = CartActionTypes.EmptyCart;
    constructor() {}
}

export type CartActions =
AddToCartAction |
IncrementCartItemQtyAction |
DecrementCartItemQtyAction |
RemoveFromCartAction |
IncrementCartItemsCountAction |
DecrementCartItemsCountAction |
IncreaseTotalCostAction |
DecreaseTotalCostAction |
EmptyCartAction
;

