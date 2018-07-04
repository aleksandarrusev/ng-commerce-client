import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductsService} from '../../../services/products.service';
import {IProduct} from '../product.model';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {
  product: IProduct;
  constructor(private route: ActivatedRoute, private productService: ProductsService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const productId = params['product-id']; // (+) converts string 'id' to a number
      this.productService.fetchProductById(productId).subscribe((product) => {
        this.product = product;
      });
    });

  }

}
