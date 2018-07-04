import {Component, OnInit} from '@angular/core';
import {Product} from '../product.model';
import {Form} from '@angular/forms';
import {ProductsService} from '../../../services/products.service';
import {ICategory} from '../../category.model';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  categories$: Observable<ICategory[]>;

  constructor(private productService: ProductsService, private router: Router, private toastrService: ToastrService) {
  }

  public showMessage: boolean;
  product: { name: string } = {name: ''};

  ngOnInit() {
    this.categories$ = this.productService.fetchAllCategories();
  }

  setFlashMessage() {
    this.showMessage = true;
    setTimeout(() => {
      this.showMessage = false;
    }, 4000);
  }

  createProduct(formValue): void {
    const product = new Product(
      formValue.name,
      formValue.category,
      formValue.price,
      formValue.stock,
      formValue.imageURL,
      formValue.description
  );

    this.productService.createProduct(product).subscribe((result) => {
      this.toastrService.success('Product created successfully!');
      console.log(result);
      this.router.navigate(['/product/' + result['_id']]);
    }, (error) => {
      console.log(error);
    });
  }
}
