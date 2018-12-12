import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { AuthService } from './services/auth.service';
import { GuardService } from './services/guard.service';

import { NavbarComponent } from './components/base/navbar/navbar.component';
import { SidebarComponent } from './components/base/sidebar/sidebar.component';
import { FooterComponent } from './components/base/footer/footer.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';
import { CategoryComponent } from './components/pages/category/category.component';
import { MenuComponent } from './components/pages/menu/menu.component';
import { OrderComponent } from './components/pages/order/order.component';
import { ProductComponent } from './components/pages/product/product.component';
import { TableComponent } from './components/pages/table/table.component';
import { AddProductComponent } from './components/pages/product/add-product/add-product.component';
import { EditProductComponent } from './components/pages/product/edit-product/edit-product.component';
import { AddCategoryComponent } from './components/pages/category/add-category/add-category.component';
import { EditCategoryComponent } from './components/pages/category/edit-category/edit-category.component';
import { AddMenuComponent } from './components/pages/menu/add-menu/add-menu.component';
import { EditMenuComponent } from './components/pages/menu/edit-menu/edit-menu.component';
import { EditOrderComponent } from './components/pages/order/edit-order/edit-order.component';
import { AddOrderComponent } from './components/pages/order/add-order/add-order.component';
import { AddTableComponent } from './components/pages/table/add-table/add-table.component';
import { EditTableComponent } from './components/pages/table/edit-table/edit-table.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [GuardService] },

  { path: 'categories', component: CategoryComponent, canActivate: [GuardService] },
  { path: 'categories/toevoegen', component: AddCategoryComponent, canActivate: [GuardService] },
  { path: 'categories/bewerken/:id', component: EditCategoryComponent, canActivate: [GuardService] },

  { path: 'menus', component: MenuComponent, canActivate: [GuardService] },
  { path: 'menus/toevoegen', component: AddMenuComponent, canActivate: [GuardService] },
  { path: 'menus/bewerken/:id', component: EditMenuComponent, canActivate: [GuardService] },

  { path: 'orders', component: OrderComponent, canActivate: [GuardService] },
  { path: 'orders/toevoegen', component: AddOrderComponent, canActivate: [GuardService] },
  { path: 'orders/bewerken/:id', component: EditOrderComponent, canActivate: [GuardService] },

  { path: 'products', component: ProductComponent, canActivate: [GuardService] },
  { path: 'products/toevoegen', component: AddProductComponent, canActivate: [GuardService] },
  { path: 'products/bewerken/:id', component: EditProductComponent, canActivate: [GuardService] },

  { path: 'tables', component: TableComponent, canActivate: [GuardService] },
  { path: 'tables/toevoegen', component: AddTableComponent, canActivate: [GuardService] },
  { path: 'tables/bewerken/:id', component: EditTableComponent, canActivate: [GuardService] },

  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    DashboardComponent,
    RegisterComponent,
    LoginComponent,
    CategoryComponent,
    MenuComponent,
    OrderComponent,
    ProductComponent,
    TableComponent,
    AddProductComponent,
    EditProductComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    AddMenuComponent,
    EditMenuComponent,
    EditOrderComponent,
    AddOrderComponent,
    AddTableComponent,
    EditTableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthService,
    GuardService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
