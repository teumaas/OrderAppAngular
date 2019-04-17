import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { MenuService } from '../../../../services/menu.service';
import { CategoryService } from '../../../../services/category.service';

import { Menu } from '../../../../interfaces/Menu.interface';

@Component({
  selector: 'app-add-menu',
  templateUrl: './add-menu.component.html',
  styleUrls: ['./add-menu.component.css']
})
export class AddMenuComponent implements OnInit {

  public addMenuForm: FormGroup;
  public categories;
  public submitted = false;

  constructor(public fB: FormBuilder, public router: Router, public menuService: MenuService, public categoryService: CategoryService) {
  }

  ngOnInit() {
    this.addMenuForm = this.fB.group({
      'title': ['', Validators.required ],
      'category': ['', Validators.required ],
    });

    this.categoryService.getCategories()
    .subscribe(result => {
      this.categories = result;
    });
  }


  saveMenu(): void {
    const menu: Menu = {
      title: this.addMenuForm.value.title,
      category: this.addMenuForm.value.category
    };

    this.submitted = true;

    if (this.addMenuForm.valid) {
      this.menuService.postMenu(menu)
      .subscribe(
          () => this.onSaveComplete(),
          (error: any) => console.log(error));
    }
  }

  onSaveComplete(): void {
    this.router.navigate(['/menus']);
  }

  get f() { return this.addMenuForm.controls; }
}
