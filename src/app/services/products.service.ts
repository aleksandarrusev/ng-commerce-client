import {IProduct, Product} from '../shopping/product/product.model';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ICategory} from '../shopping/category.model';
import {environment} from '../../environments/environment';
@Injectable()
export class ProductsService {

  categories: ICategory[];

  constructor(private http: HttpClient) {
  }

  fetchAllProducts() {
    return this.http.get<IProduct[]>(`${environment.api}/products/`);
  }

  fetchProductsByCategoryName(categoryName: string) {
    return this.http.get<IProduct[]>(`${environment.api}/categories/${categoryName}`);
  }

  fetchProductById(productId: string) {
    return this.http.get<IProduct>(`${environment.api}/products/${productId}`);
  }


  createProduct(product) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };


    return this.http.post<Product>(`${environment.api}/products/`, product, httpOptions);
  }


  fetchAllCategories() {
    return this.http.get<ICategory[]>(`${environment.api}/categories`);
  }

  // TODO
  isCategoryValid(categoryName) {
  }



}
