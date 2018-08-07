import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductsService} from '../../products/services/products.service';
import {IProduct} from '../../products/models/product.model';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {IProductsState} from '../../products/store/products.reducer';
import {getLatestProducts} from '../../products/store/products.selectors';
// import {shoppingState}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  products: IProduct[];
  private productsSubscription: Subscription;
  constructor(private store: Store<IProductsState>) {
  }

  ngOnInit() {
    this.productsSubscription = this.store.select(getLatestProducts).subscribe((products) => {
      this.products = products;
    });
  }

  ngOnDestroy() {
    this.productsSubscription.unsubscribe();
  }

}
