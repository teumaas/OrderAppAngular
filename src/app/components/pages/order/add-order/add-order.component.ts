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

  private addOrderForm: FormGroup;
  public products;
  public tables;

  // tslint:disable-next-line:max-line-length
  constructor(private fB: FormBuilder, private router: Router, private orderService: OrderService, private productService: ProductService, private tableService: TableService) {
    this.addOrderForm = this.fB.group({
      'product': ['', Validators.required ],
      'table': ['', Validators.required ]
    });
  }

  ngOnInit() {
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

    this.orderService.postOrder(order)
      .subscribe(
          () => this.onSaveComplete(),
          (error: any) => console.log(error));
  }

  onSaveComplete(): void {
    this.router.navigate(['/orders']);
  }

}
