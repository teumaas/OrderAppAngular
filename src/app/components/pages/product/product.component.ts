import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { CategoryService } from '../../../services/category.service';
import { Product } from '../../../interfaces/Product.interface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  private products: Product;

  constructor(private productService: ProductService, private categoryService: CategoryService) { }

  ngOnInit() {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    }, (err) => {
      console.error(err);
    });
    this.categoryService.getCategories().subscribe(categories => {
      this.products.category = categories;
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
