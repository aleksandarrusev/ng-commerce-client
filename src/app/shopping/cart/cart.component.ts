import { Component, OnInit } from '@angular/core';
import {CartService} from '../../services/cart.service';
import {CartItem} from './cart-item.model';
import {Location} from '@angular/common';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartStatus: {
    count: number,
    total: number,
  };

  cart: CartItem[];
  constructor(private cartService: CartService,
              private location: Location) { }

  ngOnInit() {
    this.cart = this.cartService.getAllCartItems();
    this.cartService.cartChanged.subscribe((status) => {
      this.cartStatus = status;
    });
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
    this.cartService.validateCart();
  }

  goBack() {
    this.location.back();
  }
}
