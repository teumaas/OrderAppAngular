import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { ProductService } from '../../../services/product.service';
import { TableService } from '../../../services/table.service';
import { Order } from '../../../interfaces/Order.interface';
import { Product } from '../../../interfaces/Product.interface';
import { Table } from '../../../interfaces/Table.interface';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  public orders: Order;

  constructor(public orderService: OrderService, public productService: ProductService, public tableService: TableService) { }

  ngOnInit() {
    this.orderService.getOrders().subscribe(orders => {
      this.orders = orders;
      this.productService.getProducts().subscribe(products => {
        this.orders.product = products;
        this.tableService.getTables().subscribe(tables => {
          this.orders.table = tables;
        }, (err) => {
          console.error(err);
        });
      }, (err) => {
        console.error(err);
      });
    }, (err) => {
      console.error(err);
    });
  }

  deleteOrder(order: Order) {
    this.orderService.deleteOrder(order)
    .subscribe(() => {
      this.ngOnInit();
    },
    (error) => {
      console.log(error);
    });
  }
}
