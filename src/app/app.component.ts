import {Component, DoCheck, OnInit} from '@angular/core';
import {CartService} from './services/cart.service';
import {AuthService} from './services/auth.service';
import {ProductsService} from './services/products.service';
import {ICategory} from './shopping/category.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  cartItemsCount: number;
  categories: ICategory[];
  constructor(private cartService: CartService,
              private authService: AuthService,
              private productService: ProductsService) {
  }

  ngOnInit() {
    this.productService.fetchAllCategories().subscribe((categories) => {
      this.productService.setCategories(categories);
      this.categories = categories;
    });
    if (this.authService.isLoggedIn()) {
      this.authService.authStatusChanged.next(true);
    }

    this.cartService.cartChanged.subscribe((count) => {
      this.cartItemsCount = count;
    });
  }
}
