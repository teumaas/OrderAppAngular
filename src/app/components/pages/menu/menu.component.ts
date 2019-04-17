import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../../services/menu.service';
import { Menu } from '../../../interfaces/Menu.interface';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public menus: Menu;

  constructor(public menuService: MenuService) { }

  ngOnInit() {
    this.menuService.getMenus().subscribe(menus => {
      this.menus = menus;
    }, (err) => {
      console.error(err);
    });
  }

  deleteMenu(menu: Menu) {
    this.menuService.deleteMenu(menu)
    .subscribe(() => {
      this.ngOnInit();
    },
    (error) => {
      console.log(error);
    });
  }
}
