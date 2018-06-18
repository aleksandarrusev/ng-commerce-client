import {Component, Input, OnInit} from '@angular/core';
import {Product} from './product.model';
import {CartService} from '../../services/cart.service';
import {CartItem} from '../../cart/cart-item.model';
import {Observable, Subject} from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() product: Product;
  @Input() qty: number;

  constructor(private cartService: CartService) {
  }

  updateCart(amount: number): void {
    this.cartService.updateCart(this.product, amount);
  }

  ngOnInit() {
  }

}
