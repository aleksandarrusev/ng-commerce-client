import { Component, OnInit } from '@angular/core';
import {CartService} from '../../services/cart.service';
import {CartItem} from './cart-item.model';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

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
              private router: Router,
              private toastrService: ToastrService,
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
    this.cartService.validateCart().subscribe((result) => {
      console.log(result);
      if (result.total > 0) {
        this.cartService.cartValidated.next(result.total);
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
