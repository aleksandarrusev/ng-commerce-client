import {IProduct, Product} from '../shopping/product/product.model';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ICategory} from '../shopping/category.model';
@Injectable()
export class ProductsService {

  categories: ICategory[];

  constructor(private http: HttpClient) {
  }

  fetchAllProducts() {
    return this.http.get<IProduct[]>('http://localhost:3000/api/products');
  }

  fetchProductsByCategoryName(categoryName: string) {
    return this.http.get<IProduct[]>('http://localhost:3000/api/categories/' + categoryName);
  }

  fetchProductById(productId: string) {
    return this.http.get<IProduct>('http://localhost:3000/api/products/' + productId);
  }


  createProduct(product) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };


    return this.http.post<Product>('http://localhost:3000/api/products/', product, httpOptions);
  }


  fetchAllCategories() {
    return this.http.get<ICategory[]>('http://localhost:3000/api/categories');
  }

  // TODO
  isCategoryValid(categoryName) {
  }



}
