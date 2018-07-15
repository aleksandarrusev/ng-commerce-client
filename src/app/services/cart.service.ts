import {Injectable} from '@angular/core';
import {CartItem} from '../shopping/cart/cart-item.model';
import {BehaviorSubject} from 'rxjs';
import {IProduct, Product} from '../shopping/product/product.model';
import {ICategory} from '../shopping/category.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {ToastrService} from 'ngx-toastr';
import {httpOptions} from '../shared/httpOptions';
import {tap} from 'rxjs/operators';

@Injectable()
export class CartService {
  private cart: CartItem[] = [];
  private cartStateSubject: BehaviorSubject<any> = new BehaviorSubject<any>(0);
  private cartValidatedSubject: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);

  public cartState$ = this.cartStateSubject.asObservable();
  public cartValidated$ = this.cartValidatedSubject.asObservable();
  constructor(private http: HttpClient, private router: Router, private toastrService: ToastrService) {
  }

  add(product: IProduct) {
    const existingCartItem = this.cart.find((cartItem) => {
      return cartItem.product['_id'] === product['_id'];
    });

    if (existingCartItem) {
      existingCartItem.qty++;
    } else {
      this.cart.push(new CartItem(product, 1));
    }
    this.toastrService.success('You successfully added a product to your cart!');
    this.cartStateSubject.next(this.getCartItemsCount());
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
    this.cartStateSubject.next(this.getCartItemsCount());
  }

  decrementItemQty(cartItem: CartItem) {
    cartItem.qty--;
    this.cartStateSubject.next(this.getCartItemsCount());

  }

  removeItem(cartItem: CartItem) {
    const index = this.cart.indexOf(cartItem);
    this.cart.splice(index, 1);
    this.cartStateSubject.next(this.getCartItemsCount());
  }

  validateCart() {
    const cartObj = {products: []};
    cartObj.products = this.getAllCartItemsRaw();
    return this.http.post<{ total: number }>(`${environment.api}/checkout`, cartObj, httpOptions).pipe(
      tap((result) => {
        this.cartValidatedSubject.next(result.total);
      })
    );
  }

  public getAllCartItemsRaw() {
    return this.cart.map((item: CartItem) => {
      return {
        id: item.product._id,
        name: item.product.name,
        qty: item.qty
      };
    });
  }
  public emptyCart() {
    this.cart = [];
    this.cartStateSubject.next(this.getCartItemsCount());
  }

}
