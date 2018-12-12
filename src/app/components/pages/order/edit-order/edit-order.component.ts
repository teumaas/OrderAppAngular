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

  private currentOrder: Order;
  private originalOrder: Order;
  private editOrderForm: FormGroup;

  constructor(private fB: FormBuilder, private aRoute: ActivatedRoute, private router: Router, private ordersService: OrderService) {
    this.editOrderForm = this.fB.group({
      'title': ['', Validators.required ],
      'product': ['', !Validators.required ],
      'imagePath': ['', !Validators.required ],
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
      console.error(err + 'help');
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

  saveProduct(): void {
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
