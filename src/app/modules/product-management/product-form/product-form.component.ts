import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ProductsService } from 'src/app/core/services/products.service';
import { Product } from 'src/app/models/Product.class';
import { PriceFormModalComponent } from '../price-form-modal/price-form-modal.component';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  id?: string | null;
  product: Product = new Product();
  productForm?: FormGroup;
  action?: string;

  @BlockUI() blockUI?: NgBlockUI;

  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      if (this.id !== 'nuevo') {
        this.getProduct();
        this.action = 'Editar';
      } else {
        this.action = 'Nuevo';
      }
    });
    this.productForm = this.product.toForm();
  }

  get presentations(): FormArray {
    return this.productForm?.get('presentations') as FormArray;
  }

  openPriceFormModal(id: number): void{
    const dialogRef = this.dialog.open(PriceFormModalComponent, {
      data: {
        id
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  save(): void {
    if (this.id && this.id !== 'nuevo') {
      this.productService.create(this.productForm?.value);
    } else {
      this.productService.updateProduct(String(this.id), this.productForm?.value);
    }
  }

  cancel(): void {
    this.router.navigate(['/productos']);
  }

  private getProduct(): void {
    this.blockUI?.start();
    this.productService.getProduct(Number(this.id)).subscribe(product => {
      this.product = product;
      this.productForm = this.product.toForm();
      this.blockUI?.stop();
    });
  }

}
