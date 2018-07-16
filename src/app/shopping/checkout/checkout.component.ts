import {Component, OnInit} from '@angular/core';
import {OrderService} from '../../services/order.service';
import {CartService} from '../../services/cart.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutForm: FormGroup;
  total$;

  constructor(private orderService: OrderService,
              private cartService: CartService,
              private router: Router,
              private toastrService: ToastrService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.total$ = this.cartService.cartValidated$;
    this.initForm();
  }

  initForm() {
    this.checkoutForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(40)]],
      phone: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
      address: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(60)]],
      address2: ['', [Validators.minLength(5), Validators.maxLength(60)]],
      country: ['', [Validators.required]],
      city: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      zip: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(12)]],
    });
  }


  onSubmit(form: FormGroup) {
    const address = {
      name: form.value.name,
      phone: form.value.phone,
      address: form.value.address,
      address2: form.value.address2 || null,
      country: form.value.country,
      city: form.value.city,
      zip: form.value.zip
    };

    this.orderService.submitOrder(address).subscribe(
      (result) => {
        this.toastrService.success('Your order has been successfully submitted.');
        this.router.navigate(['/order-completed']);
      },
      (error) => {
        this.toastrService.error(error.error);
      }
    );
  }
}
