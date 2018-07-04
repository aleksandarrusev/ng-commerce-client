import {Injectable} from '@angular/core';
import {CartItem} from '../shopping/cart/cart-item.model';
import {BehaviorSubject} from 'rxjs';
import {IProduct, Product} from '../shopping/product/product.model';

@Injectable()
export class CartService {
  private cart: CartItem[] = [];
  cartChanged: BehaviorSubject<number> = new BehaviorSubject<number>(0);

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

  getCartItemsCount() {
    if (this.cart.length > 0) {
      const count =  this.cart.reduce(function (accumulator, currentValue) {
        return accumulator + currentValue.qty;
      }, 0);
      return count;
    }
    return 0;
  }

}
