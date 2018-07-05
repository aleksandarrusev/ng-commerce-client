import {Component, OnInit } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {AuthService} from '../../services/auth.service';
import {CartService} from '../../services/cart.service';
import {ProductsService} from '../../services/products.service';
import {ICategory} from '../../shopping/category.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  categories$: Observable<ICategory[]>;
  cartItemsCount: number;
  isLoggedIn = false;
  user;
  constructor(private authService: AuthService, private cartService: CartService, private productService: ProductsService) {
  }

  logout() {
    this.authService.logout();
  }

  ngOnInit() {
    this.authService.authStatus.subscribe((user) => {
      if (user) {
        this.user = user;
        return;
      }
      this.user = null;
    });

    this.cartService.cartChanged.subscribe((cartStatus) => {
      this.cartItemsCount = cartStatus.count;
    });
    this.categories$ = this.productService.fetchAllCategories();
  }

}
