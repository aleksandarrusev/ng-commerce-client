import {Component, OnInit} from '@angular/core';
import {Product} from './product/product.model';
import {CartService} from '../services/cart.service';
import {CartItem} from '../cart/cart-item.model';
import {ProductsService} from '../services/products.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  constructor(private cartService: CartService, private productService: ProductsService) {
  }
  private cart: CartItem[];
  public products: Product[];

  ngOnInit() {
    this.cart = this.cartService.getAllCartItems();
    this.products = this.productService.getAllProducts();
  }

  getItemQty(product: Product) {
    return this.cartService.getItemQty(product);
  }
}
