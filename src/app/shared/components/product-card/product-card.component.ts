import {Component, Input, OnInit} from '@angular/core';
import {IProduct, Product} from '../../../products/models/product.model';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {CartService} from '../../../cart/services/cart.service';
import {ToastrService} from 'ngx-toastr';
import {Store} from '@ngrx/store';
import {IAuthState} from '../../../auth/store/auth.reducer';
import {AddToCartAction} from '../../../cart/store/cart.actions';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input() product: Product;

  constructor(
      private cartService: CartService,
      private store: Store<IAuthState>,
  ) {
  }

  addToCart(product: IProduct): void {
    this.cartService.addToCartOrIncrementQty(product);
  }

  ngOnInit() {
  }

}
