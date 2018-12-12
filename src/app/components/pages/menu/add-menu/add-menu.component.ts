import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { MenuService } from '../../../../services/menu.service';
import { Menu } from '../../../../interfaces/Menu.interface';

@Component({
  selector: 'app-add-menu',
  templateUrl: './add-menu.component.html',
  styleUrls: ['./add-menu.component.css']
})
export class AddMenuComponent implements OnInit {

  private addMenuForm: FormGroup;

  constructor(private fB: FormBuilder, private router: Router, private menuService: MenuService) {
    this.addMenuForm = this.fB.group({
      'title': ['', Validators.required ],
      'category': ['', !Validators.required ],
    });
  }

  ngOnInit() {
  }

  saveMenu(): void {
    const menu: Menu = {
      title: this.addMenuForm.value.title,
      category: this.addMenuForm.value.category
    };

    this.menuService.putMenu(menu)
      .subscribe(
          () => this.onSaveComplete(),
          (error: any) => console.log(error));
  }

  onSaveComplete(): void {
    this.router.navigate(['/menus']);
  }

}
