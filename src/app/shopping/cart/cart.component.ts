import { Component, OnInit } from '@angular/core';
import {CartService} from '../../services/cart.service';
import {CartItem} from './cart-item.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public cart: CartItem[];
  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cart = this.cartService.getAllCartItems();
    console.log(this.cart);
  }

}
