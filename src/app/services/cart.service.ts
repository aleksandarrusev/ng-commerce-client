import {Injectable} from '@angular/core';
import {CartItem} from '../shopping/cart/cart-item.model';
import {BehaviorSubject} from 'rxjs';
import {IProduct, Product} from '../shopping/product/product.model';

@Injectable()
export class CartService {
  private cart: CartItem[] = [];
  cartChanged: BehaviorSubject<any> = new BehaviorSubject<any>(0);

  add(product: IProduct) {
    const existingCartItem = this.cart.find((cartItem) => {
      return cartItem.product['_id'] === product['_id'];
    });

    if (existingCartItem) {
      existingCartItem.qty++;
    } else {
      this.cart.push(new CartItem(product, 1));
    }

    this.cartChanged.next(this.getCartItemsCount());
  }

  getAllCartItems() {
    return this.cart;
  }

  getCartItemsCount(): { count: number, total: number } {
    const cartStatus = {
      count: 0,
      total: 0,
    };
    if (this.cart.length > 0) {
      const count = this.cart.forEach(function (cartItem) {
        cartStatus.count += cartItem.qty;
        cartStatus.total += cartItem.product.price * cartItem.qty;
      });
    }

    return cartStatus;
  }

  incrementItemQty(cartItem: CartItem) {
    cartItem.qty++;
    this.cartChanged.next(this.getCartItemsCount());
  }

  decrementItemQty(cartItem: CartItem) {
    cartItem.qty--;
    this.cartChanged.next(this.getCartItemsCount());

  }

  removeItem(cartItem: CartItem) {
    const index = this.cart.indexOf(cartItem);
    this.cart.splice(index, 1);
    this.cartChanged.next(this.getCartItemsCount());
  }
}
