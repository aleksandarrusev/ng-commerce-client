import {Component, DoCheck, OnInit} from '@angular/core';
import {CartService} from './services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, DoCheck {
  public cartItemsCount: number;
  constructor(private cartService: CartService) {
  }

  ngOnInit() {
    this.cartItemsCount = this.cartService.getCartItemsCount();
  }

  ngDoCheck(): void {
    this.cartItemsCount = this.cartService.getCartItemsCount();
  }

}
