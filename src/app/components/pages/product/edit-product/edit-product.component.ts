import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { ProductService } from '../../../../services/product.service';
import { CategoryService } from '../../../../services/category.service';

import { Product } from '../../../../interfaces/Product.interface';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})

export class EditProductComponent implements OnInit {

  public currentProduct: Product;
  public originalProduct: Product;

  public editProductForm: FormGroup;
  submitted = false;

  // tslint:disable-next-line:max-line-length
  constructor(private fB: FormBuilder, private aRoute: ActivatedRoute, private router: Router, private productService: ProductService,  private categoryService: CategoryService) {
    this.editProductForm = this.fB.group({
      'name': ['', Validators.required ],
      'brand': ['', Validators.required ],
      'description': ['', Validators.required ],
      'alcoholPercentage': ['', !Validators.required ],
      'category': ['', !Validators.required ],
      'price': ['', Validators.required ],
    });
  }

  get product(): Product {
    return this.currentProduct;
  }

  set product(value: Product) {
    this.currentProduct = value;
    this.originalProduct = Object.assign({}, value);
  }

  ngOnInit() {
    this.editProductForm = this.fB.group({
      'name': ['', Validators.required ],
      'brand': ['', Validators.required ],
      'description': ['', Validators.required ],
      'alcoholPercentage': ['', Validators.required ],
      'price': ['', Validators.required],
    });

    let id: string;
    this.aRoute.paramMap.subscribe(params => id = params.get('id'));
    this.productService.getProduct(id)
    .subscribe(product => {
      this.onProductRetrieved(product);
    }, (err) => {
      console.error(err);
    });
  }

  get f() { return this.editProductForm.controls; }

  onProductRetrieved(product: Product): void {
    this.product = product;
    this.categoryService.getCategories()
    .subscribe(result => {
      this.updateValues();
    });
  }

  updateValues() {
    this.editProductForm.controls['name'].setValue(this.product.name);
    this.editProductForm.controls['brand'].setValue(this.product.brand);
    this.editProductForm.controls['description'].setValue(this.product.description);
    this.editProductForm.controls['price'].setValue(this.product.price);
    this.editProductForm.controls['alcoholPercentage'].setValue(this.product.alcoholPercentage);
    this.editProductForm.controls['category'].setValue(this.product.category);
  }

  saveProduct(): void {
    const product: Product = {
      _id: this.product._id,
      name: this.editProductForm.value.name,
      brand: this.editProductForm.value.brand,
      price: this.editProductForm.value.price,
      description: this.editProductForm.value.description,
      alcoholPercentage: this.editProductForm.value.alcoholPercentage
    };
    this.submitted = true;

    if (this.editProductForm.valid) {
    this.productService.putProduct(product)
      .subscribe(
          () => this.onSaveComplete(),
          (error: any) => console.log(error));
    }
  }

  onSaveComplete(): void {
    this.router.navigate(['/products']);
  }
}
