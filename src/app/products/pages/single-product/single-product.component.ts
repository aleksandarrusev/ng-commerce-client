import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductsService} from '../../services/products.service';
import {CartService} from '../../../cart/services/cart.service';
import {Subscription} from 'rxjs';
import {IProduct} from '../../models/product.model';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit, OnDestroy {
  product: IProduct;

  private routerSubscription: Subscription;
  constructor(private route: ActivatedRoute,
              private productService: ProductsService,
              private cartService: CartService) { }

  ngOnInit() {
    this.routerSubscription = this.route.params.subscribe(params => {
      const productId = params['product-id']; // (+) converts string 'id' to a number
      this.productService.fetchProductById(productId).subscribe((product) => {
        this.product = product;
      });
    });
  }
  addToCart(product) {
    this.cartService.add(product);
  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }
}
