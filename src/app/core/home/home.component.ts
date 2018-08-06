import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductsService} from '../../products/services/products.service';
import {IProduct} from '../../products/models/product.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  products: IProduct[];
  private productsSubscription: Subscription;
  constructor(private productService: ProductsService) {
  }

  ngOnInit() {
    this.productsSubscription = this.productService.fetchLatestProducts().subscribe((products) => {
      this.products = products;
    });
  }

  ngOnDestroy() {
    this.productsSubscription.unsubscribe();
  }

}
