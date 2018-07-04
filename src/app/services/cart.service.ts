import {Injectable} from '@angular/core';
import {CartItem} from '../shopping/cart/cart-item.model';
import {BehaviorSubject} from 'rxjs';
import {IProduct, Product} from '../shopping/product/product.model';
import {ICategory} from '../shopping/category.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable()
export class CartService {
  private cart: CartItem[] = [];
  cartChanged: BehaviorSubject<any> = new BehaviorSubject<any>(0);

  constructor(private http: HttpClient, private router: Router) {}
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

  validateCart() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    const cartObj = {products : []};
    cartObj.products = this.cart.map((item: CartItem) => {
          return {
            id: item.product._id,
            qty: item.qty
          };
    });
    this.http.post<{total: number}>('http://localhost:3000/api/checkout', cartObj, httpOptions).subscribe((result) => {
      if (result.total > 0) {
        this.router.navigate(['/checkout']);
      }
    });
  }

}
