import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { OrderService } from '../../../../services/order.service';
import { Order } from '../../../../interfaces/Order.interface';
import { ProductService } from '../../../../services/product.service';
import { TableService } from '../../../../services/table.service';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit {

  public addOrderForm: FormGroup;
  public products;
  public tables;
  public submitted = false;

  // tslint:disable-next-line:max-line-length
  constructor(public fB: FormBuilder, public router: Router, public orderService: OrderService, public productService: ProductService, public tableService: TableService) {

  }

  ngOnInit() {
    this.addOrderForm = this.fB.group({
      'product': ['', Validators.required ],
      'table': ['', Validators.required ]
    });

    this.productService.getProducts()
    .subscribe(result => {
      this.products = result;
    });

    this.tableService.getTables()
    .subscribe(result => {
      this.tables = result;
    });
  }

  saveOrder(): void {
    const order: Order = {
      product: this.addOrderForm.value.product,
      table: this.addOrderForm.value.table
    };

    this.submitted = true;

    if (this.addOrderForm.valid) {
      this.orderService.postOrder(order)
      .subscribe(
          () => this.onSaveComplete(),
          (error: any) => console.log(error));
    }
  }

  onSaveComplete(): void {
    this.router.navigate(['/orders']);
  }

  get f() { return this.addOrderForm.controls; }

}
