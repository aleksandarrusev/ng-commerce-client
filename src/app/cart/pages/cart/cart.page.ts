import {Component, OnInit} from '@angular/core';
import {CartService} from '../../services/cart.service';
import {CartItem, ICartItem} from '../../models/cart-item.model';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Store} from '@ngrx/store';
import {ICartState} from '../../store/cart.reducer';
import {getAllCartInfo, getCartItems} from '../../store/cart.selectors';
import {DecrementCartItemQtyAction, IncrementCartItemQtyAction} from '../../store/cart.actions';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.page.html',
    styleUrls: ['./cart.page.css']
})
export class CartPage implements OnInit {
    cartStatus: {
        count: number,
        total: number,
    };

    cart: CartItem[];

    constructor(private cartService: CartService,
                private router: Router,
                private store: Store<ICartState>,
                private toastrService: ToastrService,
                private location: Location) {
    }

    ngOnInit() {
        this.store.select(getAllCartInfo).subscribe((cartInfo: ICartState) => {
            this.cart = cartInfo.cartItems;
            this.cartStatus = {
                total: cartInfo.cartTotal,
                count: cartInfo.cartItemsCount
            };
        });
    }

    incrementQty(cartItem) {

    }

    decrementQty(cartItem) {
        this.store.dispatch(new DecrementCartItemQtyAction(cartItem));
    }

    removeItem(cartItem) {
        this.cartService.removeItem(cartItem);
    }

    validateCart() {
        this.cartService.validateCart().subscribe((result) => {
            if (result.total > 0) {
                this.router.navigate(['/checkout']);
            }
        }, (error) => {
            this.toastrService.error(error);
        });
    }

    goBack() {
        this.location.back();
    }
}
