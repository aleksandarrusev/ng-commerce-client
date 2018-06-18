import {Injectable} from '@angular/core';
import {CartItem} from '../cart/cart-item.model';
import {Product} from '../shop/product/product.model';

@Injectable()
export class CartService {
  private cart: CartItem[] = [];

  updateCart(product: Product, amount: number) {
    const item = this.getCartItem(product);
    if (item) {
      this.updateQty(item, amount);
      return;
    }
    const newItem = new CartItem(product, 1);
    this.cart.push(newItem);
  }

  updateQty(item: CartItem, amount): void {
    if (item.qty + amount < 1) {
      item.qty += amount;
      const index = this.cart.indexOf(item);
      this.cart.splice(index, 1);
      return;
    }
    item.qty += amount;
  }

  getAllCartItems() {
    return this.cart;
  }

  getCartItem(product: Product): CartItem {
    const item =  this.cart.find(cartItem => {
      return cartItem.product === product;
    });

    if (item) {
      return item;
    }
    return null;
  }

  getItemQty(product: Product): number {
    const item = this.getCartItem(product);
    if (item) {
      return item.qty;
    }
    return 0;
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
