import {Injectable} from '@angular/core';
import {CartItem, ICartItem} from '../models/cart-item.model';
import {BehaviorSubject} from 'rxjs';
import {IProduct, Product} from '../../products/models/product.model';
import {ICategory} from '../../products/models/category.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {ToastrService} from 'ngx-toastr';
import {httpOptions} from '../../shared/httpOptions';
import {first, tap} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {ICartState} from '../store/cart.reducer';
import {
    AddToCartAction,
    DecrementCartItemQtyAction,
    IncreaseTotalCostAction,
    IncrementCartItemQtyAction,
    IncrementCartItemsCountAction
} from '../store/cart.actions';
import {getCartItems} from '../store/cart.selectors';

@Injectable()
export class CartService {
    private cartState: ICartState;
    private cartValidatedSubject: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);
    public cartValidated$ = this.cartValidatedSubject.asObservable();

    constructor(private http: HttpClient,
                private router: Router,
                private toastrService: ToastrService,
                private store: Store<ICartState>) {
    }

    addToCartOrIncrementQty(product: IProduct): void {
        this.store.select(getCartItems).pipe(
            first(),
        ).subscribe((cartItems) => {
            const cartItemsCopy = [...cartItems];
            const existingCartItem: ICartItem | null = cartItemsCopy.find((item: ICartItem) => item.product._id === product._id);

            if (existingCartItem) {
                this.store.dispatch(new IncrementCartItemQtyAction(existingCartItem));
                this.store.dispatch(new IncreaseTotalCostAction(existingCartItem.product.price));
            } else {
                const newItem = new CartItem(product, 1);
                cartItemsCopy.push(newItem);
                this.store.dispatch(new AddToCartAction(cartItemsCopy));
                this.store.dispatch(new IncreaseTotalCostAction(newItem.product.price));
            }
            this.toastrService.success('You successfully added a product to your cart!');
        });

    }


    incrementItemQty(cartItem: CartItem) {
        this.store.dispatch(new IncrementCartItemQtyAction(cartItem));
    }

    decrementItemQty(cartItem: CartItem) {
        this.store.dispatch(new DecrementCartItemQtyAction(cartItem));
    }

    removeItem(cartItem: CartItem) {
        // const index = this.cart.indexOf(cartItem);
        // this.cart.splice(index, 1);
        // this.cartStateSubject.next(this.getCartItemsCount());
    }

    validateCart() {
        const cartObj = {products: []};
        // cartObj.products = this.getAllCartItemsRaw();
        return this.http.post<{ total: number }>(`${environment.api}/checkout`, cartObj, httpOptions).pipe(
            tap((result) => {
                // this.cartValidatedSubject.next(result.total);
            })
        );
    }

    public getAllCartItemsRaw() {
        return [].map((item: CartItem) => {
            return {
                id: item.product._id,
                name: item.product.name,
                qty: item.qty
            };
        });
    }

    public emptyCart() {
        // this.cart = [];
        // this.cartStateSubject.next(this.getCartItemsCount());
    }

}
