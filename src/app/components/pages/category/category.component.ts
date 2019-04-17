import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { ProductService } from '../../../services/product.service';
import { Category } from '../../../interfaces/Category.interface';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  public categories: Category;

  constructor(public categoryService: CategoryService, public productService: ProductService) { }

  ngOnInit() {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
      this.productService.getProducts().subscribe(products => {
        this.categories.product = products;
      }, (err) => {
        console.error(err);
      });
    }, (err) => {
      console.error(err);
    });
  }

  deleteCategory(category: Category) {
    this.categoryService.deleteCategory(category)
    .subscribe(() => {
      this.ngOnInit();
    },
    (error) => {
      console.log(error);
    });
  }
}
