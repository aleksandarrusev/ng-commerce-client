import { Component, OnInit } from '@angular/core';
import {ProductsService} from '../../../services/products.service';
import {Product} from '../product.model';
import {Form} from '@angular/forms';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  constructor(private productService: ProductsService) { }
  public success: boolean;
  product: {name: string} = {name: ''};
  ngOnInit() {
  }

  setFlashMessage() {
    this.success = true;
    const context = this;
    setTimeout(() => {
      context.success = false;
    }, 4000);
  }

  createProduct(formValue): void {
    const newProduct = new Product(formValue.name, formValue.category, formValue.imageUrl);
    this.productService.addProduct(newProduct);
    this.setFlashMessage();
  }
}
