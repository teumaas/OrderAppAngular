import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { ProductService } from '../../../../services/product.service';
import { CategoryService } from '../../../../services/category.service';
import { Category } from '../../../../interfaces/Category.interface';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {

  public currentCategory: Category;
  public originalCategory: Category;
  public editCategoryForm: FormGroup;
  public products;
  submitted = false;

  // tslint:disable-next-line:max-line-length
  constructor(public fB: FormBuilder, public aRoute: ActivatedRoute, public router: Router, public categoryService: CategoryService, public productService: ProductService) {

  }

  get category(): Category {
    return this.currentCategory;
  }

  set category(value: Category) {
    this.currentCategory = value;
    this.originalCategory = Object.assign({}, value);
  }

  ngOnInit() {
    this.editCategoryForm = this.fB.group({
      'title': ['', Validators.required ],
      'product': ['', Validators.required ]
    });

    let id: string;
    this.aRoute.paramMap.subscribe(params => id = params.get('id'));
    this.categoryService.getCategory(id)
    .subscribe(category => {
      this.onCategoryRetrieved(category);
    }, (err) => {
      console.error(err);
    });
  }

  onCategoryRetrieved(category: Category): void {
    this.category = category;
    this.productService.getProducts()
    .subscribe(result => {
      this.products = result;
      this.updateValues();
    });
  }

  updateValues() {
    this.editCategoryForm.controls['title'].setValue(this.category.title);
    this.editCategoryForm.controls['product'].setValue(this.category.product);
  }

  saveCategory(): void {
    const category: Category = {
      _id: this.category._id,
      title: this.editCategoryForm.value.title,
      product: this.products
    };
    this.submitted = true;

    if (this.editCategoryForm.valid) {
      this.categoryService.putCategory(category)
      .subscribe(
          () => this.onSaveComplete(),
          (error: any) => console.log(error));
      }
  }

  onSaveComplete(): void {
    this.router.navigate(['/categories']);
  }

  onProductSelected(event) {
    this.products = event.target.value;
  }

  get f() { return this.editCategoryForm.controls; }
}
