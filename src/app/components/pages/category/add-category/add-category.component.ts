import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { CategoryService } from '../../../../services/category.service';
import { ProductService } from '../../../../services/product.service';

import { Category } from '../../../../interfaces/Category.interface';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  public addCategoryForm: FormGroup;
  public products;

  // tslint:disable-next-line:max-line-length
  constructor(public fB: FormBuilder, public router: Router, public categoryService: CategoryService, public productService: ProductService) {
    this.addCategoryForm = this.fB.group({
      'title': ['', Validators.required ],
      'product': ['', !Validators.required ],
      'imagePath': ['', !Validators.required ],
    });
  }

  ngOnInit() {
    this.productService.getProducts()
    .subscribe(result => {
      this.products = result;
    });
  }

  saveCategory(): void {
    const category: Category = {
      title: this.addCategoryForm.value.title,
      product: this.addCategoryForm.value.product,
      imagePath: this.addCategoryForm.value.imagePath
    };

    this.categoryService.postCategory(category)
      .subscribe(
          () => this.onSaveComplete(),
          (error: any) => console.log(error));
  }

  onSaveComplete(): void {
    this.router.navigate(['/categories']);
  }
}
