import {Component, OnInit} from '@angular/core';
import {IProduct, Product} from '../product/product.model';
import {CartService} from '../../services/cart.service';
import {ProductsService} from '../../services/products.service';
import {CartItem} from '../cart/cart-item.model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  private cart: CartItem[];
  public products: IProduct[];
  public category: string;

  constructor(
    private cartService: CartService,
    private productService: ProductsService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.cart = this.cartService.getAllCartItems();

    this.route.params.subscribe(params => {
      this.category = params['category-name'];
      this.productService.fetchProductsByCategoryName(this.category).subscribe((products) => {
        this.products = products;
        console.log(products);
      });
    });
  }
}
