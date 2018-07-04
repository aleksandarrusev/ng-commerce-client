import {Component, Input, OnInit} from '@angular/core';
import {IProduct, Product} from '../product.model';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {CartService} from '../../../services/cart.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input() product: Product;
  @Input() qty: number;

  constructor(private cartService: CartService, private toastrService: ToastrService) {
  }

  addToCart(product: IProduct): void {
    this.cartService.add(product);
    this.toastrService.success('You successfully added a product to your cart!');
  }

  ngOnInit() {
  }

}
