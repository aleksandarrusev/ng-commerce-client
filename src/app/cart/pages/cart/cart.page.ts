import {Component, OnInit} from '@angular/core';
import {CartService} from '../../services/cart.service';
import {CartItem, ICartItem} from '../../models/cart-item.model';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {ICartState} from '../../store/cart.reducer';
import {getAllCartInfo, getAllCartItems} from '../../store/cart.selectors';
import {DecrementCartItemQtyAction, IncrementCartItemQtyAction} from '../../store/cart.actions';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.page.html',
    styleUrls: ['./cart.page.css']
})
export class CartPage implements OnInit {

    cartTotal: Observable<number>;
    cartItemsCount: Observable<number>;
    cartItems: Observable<CartItem[]>;

    constructor(private cartService: CartService,
                private router: Router,
                private toastrService: ToastrService,
                private location: Location) {
    }

    ngOnInit() {
        this.cartTotal = this.cartService.getCartTotal();
        this.cartItemsCount = this.cartService.getCartItemsCount();
        this.cartItems = this.cartService.getAllCartItems();

    }

    incrementQty(cartItem) {
        this.cartService.incrementItemQty(cartItem);
    }

    decrementQty(cartItem) {
        this.cartService.decrementItemQty(cartItem);
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
