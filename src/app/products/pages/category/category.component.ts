import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductsService} from '../../services/products.service';
import {ActivatedRoute, Router} from '@angular/router';
import {combineLatest, Subscription} from 'rxjs';
import {CartItem} from '../../../cart/models/cart-item.model';
import {IProduct} from '../../models/product.model';
import {CartService} from '../../../cart/services/cart.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit, OnDestroy {
  public products: IProduct[];
  public category: string;
  priceRange = 200;
  private cart: CartItem[];
  private routerSubscription: Subscription;
  constructor(
    private cartService: CartService,
    private productService: ProductsService,
    private routerService: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.cart = this.cartService.getAllCartItems();

    const routerObservables$ = combineLatest(this.route.params, this.route.queryParams, (params, qparams) => ({
      params,
      qparams
    }));

    this.routerSubscription = routerObservables$.subscribe(allParams => {
      const qParams = allParams.qparams;
      this.category = allParams.params['category-name'];
      this.productService.fetchProductsByCategoryName(this.category, qParams).subscribe((products) => {
        this.products = products;
      });
    });
  }

  filterProducts() {
    this.routerService.navigate(['/category/' + this.category], { queryParams: {max: this.priceRange} });
  }

  resetFilter() {
    this.routerService.navigate(['/category/' + this.category], );
    this.priceRange = 200;
  }
  showRange() {
    console.log(this.priceRange);
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }

}
