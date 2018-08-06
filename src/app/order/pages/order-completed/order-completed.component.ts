import { Component, OnInit } from '@angular/core';
import {OrderService} from '../../services/order.service';

@Component({
  selector: 'app-order-completed',
  templateUrl: './order-completed.component.html',
  styleUrls: ['./order-completed.component.css']
})
export class OrderCompletedComponent implements OnInit {

  public orderData;
  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.orderData = this.orderService.orderCompleted.getValue();
  }

}
