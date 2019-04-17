import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { ProductService } from '../../../../services/product.service';
import { CategoryService } from '../../../../services/category.service';

import { Product } from '../../../../interfaces/Product.interface';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  public newProductForm: FormGroup;
  public categories;
  submitted = false;

  // tslint:disable-next-line:max-line-length
  constructor(private fB: FormBuilder, private router: Router, private productService: ProductService, private categoryService: CategoryService) {
   }

  ngOnInit() {
    this.newProductForm = this.fB.group({
      'name': ['', Validators.required ],
      'brand': ['', Validators.required ],
      'description': ['', Validators.required ],
      'imagePath': ['', !Validators.required ],
      'alcoholPercentage': [!Validators.required, Validators.pattern('[0-9]*')],
      'category': ['', !Validators.required ],
      'price': ['', Validators.required],
    });

    this.categoryService.getCategories()
    .subscribe(result => {
      this.categories = result;
    });
  }

  saveProduct(): void {
    const product: Product = {
      name: this.newProductForm.value.name,
      brand: this.newProductForm.value.brand,
      price: this.newProductForm.value.price,
      description: this.newProductForm.value.description,
      imagePath: this.newProductForm.value.imagePath,
      alcoholPercentage: this.newProductForm.value.alcoholPercentage,
      category: this.newProductForm.value.category
    };

    this.submitted = true;

    if (this.newProductForm.valid) {
      this.productService.postProduct(product)
      .subscribe(
          () => this.onSaveComplete(),
          (error: any) => console.log(error));
    }
  }

  onSaveComplete(): void {
    this.router.navigate(['/products']);
  }

  get f() { return this.newProductForm.controls; }
}
