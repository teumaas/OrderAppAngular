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

  private addMenuForm: FormGroup;
  public categories;

  constructor(private fB: FormBuilder, private router: Router, private menuService: MenuService, private categoryService: CategoryService) {
    this.addMenuForm = this.fB.group({
      'title': ['', Validators.required ],
      'category': ['', !Validators.required ],
    });
  }

  ngOnInit() {
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

    this.menuService.postMenu(menu)
      .subscribe(
          () => this.onSaveComplete(),
          (error: any) => console.log(error));
  }

  onSaveComplete(): void {
    this.router.navigate(['/menus']);
  }

}
