import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {first, map} from 'rxjs/operators';
import {OrderService} from '../../services/order.service';

@Injectable({
  providedIn: 'root'
})
export class OrderCompletedGuard implements CanActivate {
  constructor(private orderService: OrderService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

    return this.orderService.orderCompleted.pipe
    (map(((validated) => {
      if (validated) {
        return true;
      }
      this.router.navigate(['/']);
      return false;
    })), first());

  }
}
