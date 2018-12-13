import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { MenuService } from '../../../../services/menu.service';
import { CategoryService } from '../../../../services/category.service';

import { Menu } from '../../../../interfaces/Menu.interface';

@Component({
  selector: 'app-edit-menu',
  templateUrl: './edit-menu.component.html',
  styleUrls: ['./edit-menu.component.css']
})
export class EditMenuComponent implements OnInit {

  private currentMenu: Menu;
  private originalMenu: Menu;
  private editMenuForm: FormGroup;
  private categories;

  // tslint:disable-next-line:max-line-length
  constructor(private fB: FormBuilder, private aRoute: ActivatedRoute, private router: Router, private menuService: MenuService, private categoryService: CategoryService) {
    this.editMenuForm = this.fB.group({
      'title': ['', Validators.required ],
      'category': ['', !Validators.required ],
    });
  }

  get menu(): Menu {
    return this.currentMenu;
  }

  set menu(value: Menu) {
    this.currentMenu = value;
    this.originalMenu = Object.assign({}, value);
  }

  ngOnInit() {
    let id: string;
    this.aRoute.paramMap.subscribe(params => id = params.get('id'));
    this.menuService.getMenu(id)
    .subscribe(menu => {
      this.onMenuRetrieved(menu);
    }, (err) => {
      console.error(err);
    });
  }

  onMenuRetrieved(menu: Menu): void {
    this.menu = menu;
    this.categoryService.getCategories()
    .subscribe(result => {
      this.categories = result;
      this.updateValues();
    });
  }

  updateValues() {
    this.editMenuForm.controls['title'].setValue(this.menu.title);
    this.editMenuForm.controls['category'].setValue(this.menu.category);
  }

  saveMenu(): void {
    const menu: Menu = {
      _id: this.menu._id,
      title: this.editMenuForm.value.title,
      category: this.categories
    };

    this.menuService.putMenu(menu)
      .subscribe(
          () => this.onSaveComplete(),
          (error: any) => console.log(error));
  }

  onSaveComplete(): void {
    this.router.navigate(['/menus']);
  }

  onCategorySelected(event) {
    this.categories = event.target.value;
  }

}
