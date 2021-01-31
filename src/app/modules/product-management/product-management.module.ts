import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductManagementRoutingModule } from './product-management-routing.module';
import { ProductsListComponent } from './products-list/products-list.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [ProductsListComponent],
  imports: [
    CommonModule,
    ProductManagementRoutingModule,
    SharedModule
  ]
})
export class ProductManagementModule { }
