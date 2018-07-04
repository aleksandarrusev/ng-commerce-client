import {Component, OnInit} from '@angular/core';
import {OrderService} from '../../services/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private orderService: OrderService) {
  }

  ngOnInit() {
  }

  onSubmit(form) {
    const formValue = form.value;

    const address = {
      name: formValue.name,
      phone: formValue.phone,
      address: formValue.address,
      address2: formValue.address2 || null,
      country: formValue.country,
      city: formValue.city,
      zip: formValue.zip
    };
    this.orderService.submitOrder(address);
  }
}
