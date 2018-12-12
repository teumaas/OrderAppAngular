import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../interfaces/Product.interface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  private products: Product;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    }, (err) => {
      console.error(err);
    });
  }

  deleteProduct(product: Product) {
    this.productService.deleteProduct(product)
    .subscribe(() => {
      this.ngOnInit();
    },
    (error) => {
      console.log(error);
    });
  }
}
