import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { CategoryService } from '../../../../services/category.service';
import { Category } from '../../../../interfaces/Category.interface';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  private addCategoryForm: FormGroup;

  constructor(private fB: FormBuilder, private router: Router, private categoryService: CategoryService) {
    this.addCategoryForm = this.fB.group({
      'title': ['', Validators.required ],
      'product': ['', !Validators.required ],
      'imagePath': ['', !Validators.required ],
    });
  }

  ngOnInit() {
  }

  saveCategory(): void {
    const category: Category = {
      title: this.addCategoryForm.value.title,
      product: this.addCategoryForm.value.product,
      imagePath: this.addCategoryForm.value.imagePath
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
