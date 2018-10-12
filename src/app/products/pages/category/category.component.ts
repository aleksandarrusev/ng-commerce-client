import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductsService} from '../../services/products.service';
import {ActivatedRoute, Router} from '@angular/router';
import {combineLatest, Subscription} from 'rxjs';
import {CartItem} from '../../../cart/models/cart-item.model';
import {IProduct} from '../../models/product.model';
import {CartService} from '../../../cart/services/cart.service';
import {Store} from '@ngrx/store';
import {IProductsState} from '../../store/products.reducer';
import {FetchProductsByCategoryAction} from '../../store/products.actions';
import {getProductsByCategory} from '../../store/products.selectors';

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
    private store: Store<IProductsState>,
    private routerService: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit() {

    const routerObservables$ = combineLatest(this.route.params, this.route.queryParams, (params, qparams) => ({
      params,
      qparams
    }));

    this.routerSubscription = routerObservables$.subscribe(allParams => {
      const qParams = allParams.qparams;
      this.category = allParams.params['category-name'];
      this.store.dispatch(new FetchProductsByCategoryAction({category: this.category, qParams}));
    });

    this.store.select(getProductsByCategory).subscribe((products) => {
      this.products = products;
    });
  }

  filterProducts() {
    this.routerService.navigate(['/category/' + this.category], { queryParams: {max: this.priceRange} });
  }

  resetFilter() {
    this.routerService.navigate(['/category/' + this.category], );
    this.priceRange = 200;
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }

}
