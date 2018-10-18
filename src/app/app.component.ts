import {Component, OnInit} from '@angular/core';
import {AuthService} from './auth/services/auth.service';
import {ProductsService} from './products/services/products.service';
import {routerFadeAnimation} from './shared/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [routerFadeAnimation]
})
export class AppComponent implements OnInit {


  constructor(private authService: AuthService, private productService: ProductsService) {
  }

  ngOnInit() {
  }

  getPage(outlet) {
    return outlet.activatedRouteData['page'] || 'one';
  }
}
