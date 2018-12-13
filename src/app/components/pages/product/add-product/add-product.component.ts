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

  private newProductForm: FormGroup;
  public categories;

  // tslint:disable-next-line:max-line-length
  constructor(private fB: FormBuilder, private router: Router, private productService: ProductService, private categoryService: CategoryService) {
    this.newProductForm = this.fB.group({
      'name': ['', Validators.required ],
      'brand': ['', Validators.required ],
      'description': ['', Validators.required ],
      'imagePath': ['', !Validators.required ],
      'alcoholPercentage': ['', !Validators.required ],
      'category': ['', !Validators.required ],
      'price': ['', Validators.required ],
    });
   }

  ngOnInit() {
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

    this.productService.postProduct(product)
      .subscribe(
          () => this.onSaveComplete(),
          (error: any) => console.log(error));
  }

  onSaveComplete(): void {
    this.router.navigate(['/products']);
  }

}
