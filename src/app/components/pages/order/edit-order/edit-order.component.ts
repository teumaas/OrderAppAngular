import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { OrderService } from '../../../../services/order.service';
import { Order } from '../../../../interfaces/Order.interface';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.css']
})
export class EditOrderComponent implements OnInit {

  public currentOrder: Order;
  public originalOrder: Order;
  public editOrderForm: FormGroup;

  constructor(public fB: FormBuilder, public aRoute: ActivatedRoute, public router: Router, public ordersService: OrderService) {
    this.editOrderForm = this.fB.group({
      'product': ['', Validators.required ],
      'table': ['', Validators.required ]
    });
  }

  get orders(): Order {
    return this.currentOrder;
  }

  set orders(value: Order) {
    this.currentOrder = value;
    this.originalOrder = Object.assign({}, value);
  }

  ngOnInit() {
    let id: string;
    this.aRoute.paramMap.subscribe(params => id = params.get('id'));
    this.ordersService.getOrder(id)
    .subscribe(orders => {
      this.onOrderRetrieved(orders);
    }, (err) => {
      console.error(err);
    });
  }

  onOrderRetrieved(orders: Order): void {
    this.orders = orders;
    this.updateValues();
  }

  updateValues() {
    this.editOrderForm.controls['product'].setValue(this.orders.product);
    this.editOrderForm.controls['table'].setValue(this.orders.table);
  }

  saveOrder(): void {
    const orders: Order = {
      _id: this.orders._id,
      product: this.editOrderForm.value.product,
      table: this.editOrderForm.value.table,
    };

    this.ordersService.putOrder(orders)
      .subscribe(
          () => this.onSaveComplete(),
          (error: any) => console.log(error));
  }

  onSaveComplete(): void {
    this.router.navigate(['/order']);
  }

}
