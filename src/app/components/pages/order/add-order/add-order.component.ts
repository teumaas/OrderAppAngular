import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { OrderService } from '../../../../services/order.service';
import { Order } from '../../../../interfaces/Order.interface';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit {

  private addOrderForm: FormGroup;

  constructor(private fB: FormBuilder, private router: Router, private orderService: OrderService) {
    this.addOrderForm = this.fB.group({
      'product': ['', !Validators.required ],
      'table': ['', !Validators.required ]
    });
  }

  ngOnInit() {
  }

  saveOrder(): void {
    const order: Order = {
      product: this.addOrderForm.value.product,
      table: this.addOrderForm.value.table,
    };

    this.orderService.putOrder(order)
      .subscribe(
          () => this.onSaveComplete(),
          (error: any) => console.log(error));
  }

  onSaveComplete(): void {
    this.router.navigate(['/orders']);
  }

}
