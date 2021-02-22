import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductManagementRoutingModule } from './product-management-routing.module';
import { ProductsListComponent } from './products-list/products-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductsTableComponent } from './products-table/products-table.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { PriceFormModalComponent } from './price-form-modal/price-form-modal.component';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';

@NgModule({
  declarations: [
    ProductsListComponent,
    ProductsTableComponent,
    ProductFormComponent,
    PriceFormModalComponent
  ],
  imports: [
    CommonModule,
    NgBootstrapFormValidationModule,
    ProductManagementRoutingModule,
    SharedModule
  ]
})
export class ProductManagementModule { }
