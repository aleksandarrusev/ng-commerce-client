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
  constructor(public payload: {cartItem: ICartItem}) {}
}
export class IncrementCartItemQtyAction implements Action {
    readonly type = CartActionTypes.IncrementCartItemQty;
    constructor(public payload: {cartItem: ICartItem}) {}
}
export class DecrementCartItemQtyAction implements Action {
    readonly type = CartActionTypes.DecrementCartItemQty;
    constructor(public payload: {cartItem: ICartItem}) {}
}
export class RemoveFromCartAction implements Action {
    readonly type = CartActionTypes.RemoveFromCart;
    constructor(public payload: {cartItem: CartItem}) {}
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
EmptyCartAction
;

