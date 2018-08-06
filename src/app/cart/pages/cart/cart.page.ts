import { Component, OnInit } from '@angular/core';
import {CartService} from '../../services/cart.service';
import {CartItem} from '../../models/cart-item.model';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

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
              private toastrService: ToastrService,
              private location: Location) { }

  ngOnInit() {
    this.cart = this.cartService.getAllCartItems();
    this.cartService.cartState$.subscribe((status) => {
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
