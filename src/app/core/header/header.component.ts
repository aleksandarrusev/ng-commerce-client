import {Component, DoCheck, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Subject} from 'rxjs';
import {AuthService} from '../../services/auth.service';
import {CartService} from '../../services/cart.service';
import {ProductsService} from '../../services/products.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() categories: String[];
  cartItemsCount: number;
  isLoggedIn: boolean;
  constructor(private authService: AuthService, private cartService: CartService, private productService: ProductsService) {
  }

  logout() {
    this.authService.logout();
  }

  ngOnInit() {
    this.authService.authStatusChanged.subscribe((value: boolean) => {
      this.isLoggedIn = value;
    });

    this.cartService.cartChanged.subscribe((status) => {
      this.cartItemsCount = status.count;
    });
  }

}
