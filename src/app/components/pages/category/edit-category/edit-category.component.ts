import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { CategoryService } from '../../../../services/category.service';
import { Category } from '../../../../interfaces/Category.interface';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {

  private currentCategory: Category;
  private originalCategory: Category;
  private editCategoryForm: FormGroup;

  constructor(private fB: FormBuilder, private aRoute: ActivatedRoute, private router: Router, private categoryService: CategoryService) {
    this.editCategoryForm = this.fB.group({
      'title': ['', Validators.required ],
      'product': ['', !Validators.required ],
      'imagePath': ['', !Validators.required ],
    });
  }

  get category(): Category {
    return this.currentCategory;
  }

  set category(value: Category) {
    this.currentCategory = value;
    this.originalCategory = Object.assign({}, value);
  }

  ngOnInit() {
    let id: string;
    this.aRoute.paramMap.subscribe(params => id = params.get('id'));
    this.categoryService.getCategory(id)
    .subscribe(category => {
      this.onCategoryRetrieved(category);
    }, (err) => {
      console.error(err + 'help');
    });
  }

  onCategoryRetrieved(category: Category): void {
    this.category = category;
    this.updateValues();
  }

  updateValues() {
    this.editCategoryForm.controls['title'].setValue(this.category.title);
    this.editCategoryForm.controls['product'].setValue(this.category.product);
    this.editCategoryForm.controls['imagePath'].setValue(this.category.imagePath);
  }

  saveProduct(): void {
    const category: Category = {
      _id: this.category._id,
      title: this.editCategoryForm.value.title,
      product: this.editCategoryForm.value.product,
      imagePath: this.editCategoryForm.value.imagePath,
    };

    this.categoryService.putCategory(category)
      .subscribe(
          () => this.onSaveComplete(),
          (error: any) => console.log(error));
  }

  onSaveComplete(): void {
    this.router.navigate(['/categories']);
  }

}
