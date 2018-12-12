import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { ProductService } from '../../../../services/product.service';
import { Product } from '../../../../interfaces/Product.interface';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  private newProductForm: FormGroup;

  constructor(private fB: FormBuilder, private router: Router, private productService: ProductService) {
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
