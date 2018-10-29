import {Injectable} from '@angular/core';
import {CartItem, ICartItem} from '../models/cart-item.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {IProduct, Product} from '../../products/models/product.model';
import {ICategory} from '../../products/models/category.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {ToastrService} from 'ngx-toastr';
import {httpOptions} from '../../shared/httpOptions';
import {first, map, switchMap, tap} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {ICartState} from '../store/cart.reducer';
import {
    AddToCartAction,
    DecrementCartItemQtyAction,
    IncrementCartItemQtyAction, RemoveFromCartAction,
} from '../store/cart.actions';
import {getAllCartInfo, getAllCartItems, getCartItemsCount, getCartTotal} from '../store/cart.selectors';

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
        this.store.select(getAllCartItems).pipe(
            first(),
        ).subscribe((cartItems) => {
            const existingCartItem: ICartItem = cartItems.find((item: ICartItem) => item.product._id === product._id);

            if (existingCartItem) {
              existingCartItem.qty += 1;
                this.store.dispatch(new IncrementCartItemQtyAction({cartItem: existingCartItem}));
            } else {
                const newItem = new CartItem(product, 1);
                this.store.dispatch(new AddToCartAction({cartItem: newItem}));
            }
            this.toastrService.success('You successfully added a product to your cart!');
        });

    }


    incrementItemQty(cartItem: CartItem) {
        this.store.select(getAllCartItems).pipe(
            first(),
        ).subscribe((cartItems) => {
            const itemToBeIncremented: ICartItem = cartItems.find((item: ICartItem) => item.product._id === cartItem.product._id);
            itemToBeIncremented.qty += 1;

            this.store.dispatch(new IncrementCartItemQtyAction({cartItem: itemToBeIncremented}));
        });
    }

    decrementItemQty(cartItem: CartItem) {
        this.store.select(getAllCartItems).pipe(
            first(),
        ).subscribe((cartItems) => {
            const itemToBeDecremented: ICartItem = cartItems.find((item: ICartItem) => item.product._id === cartItem.product._id);
            itemToBeDecremented.qty -= 1;

            this.store.dispatch(new DecrementCartItemQtyAction({cartItem: itemToBeDecremented}));
        });
    }

    removeItem(cartItem: CartItem) {
        this.store.dispatch(new RemoveFromCartAction({cartItem}));
    }

    validateCart() {
        return this.store.select(getAllCartItems).pipe(
            first(),
            switchMap((cartItems) => {
                const parsedCartItems = cartItems.map((item) => {
                    return {id: item.product._id, qty: item.qty};
                });
                const cartObj = {products: parsedCartItems};
                return this.http.post<{ total: number }>(`${environment.api}/checkout`, cartObj, httpOptions);
            }),
            tap((result) => {
                console.log(result);
                this.cartValidatedSubject.next(result.total);
            })
        );
    }
    public getAllCartItems(): Observable<any> {
        return this.store.select(getAllCartItems);
    }

    public getCartTotal(): Observable<any> {
        return this.store.select(getCartTotal);
    }
    public getCartItemsCount(): Observable<any> {
        return this.store.select(getCartItemsCount);
    }


    public getAllCartItemsRaw(): Observable<object> {
        return this.store.select(getAllCartItems).pipe(
          map((cartItems: ICartItem[]) => {
                return cartItems.map(cartItem => ({
                    id: cartItem.product._id,
                    name: cartItem.product.name,
                    qty: cartItem.qty
                }));
          })
        );
    }

    public emptyCart() {
        // this.cart = [];
        // this.cartStateSubject.next(this.getCartItemsCount());
    }

}
