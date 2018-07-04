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
  constructor(private authService: AuthService, private productService: ProductsService) {}

  ngOnInit() {
    this.productService.fetchAllCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }
}
