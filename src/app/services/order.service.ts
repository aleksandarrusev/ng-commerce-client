import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {CartService} from './cart.service';
import {AuthService} from './auth.service';

@Injectable()
export class OrderService {

  constructor(private router: Router, private cartService: CartService, private authService: AuthService) { }

  submitOrder(address) {
    const products = this.cartService.getAllCartItems();
    const userId = this.authService.getUser()._id;
    
  }
}
