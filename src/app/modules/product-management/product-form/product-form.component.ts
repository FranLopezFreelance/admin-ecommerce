import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ProductsService } from 'src/app/core/services/products.service';
import { SwalService } from 'src/app/core/services/swal.service';
import { Product } from 'src/app/models/Product.class';
import { PriceFormModalComponent } from '../price-form-modal/price-form-modal.component';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html'
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
    public dialog: MatDialog,
    private swalService: SwalService
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

  addPresentation(): void {
    this.presentations.push(new FormGroup({
      id: new FormControl(null),
      name: new FormControl('', [Validators.required]),
      amount: new FormControl(null, [Validators.required]),
      description: new FormControl(''),
      active: new FormControl(1),
    }));
  }

  delPresentation(i: number): void {
    this.swalService.confirm(
      '¿Seguro que quiere quitar la presentación?',
      'Una vez que guarde los cambios en el formulario, la presntación se eliminará definitivamente.',
      'Si', 'No').then((result: any) => {
        if (result.isConfirmed) {
          this.presentations.removeAt(i);
          this.presentations.markAsDirty();
        }
    });
  }

  openPriceFormModal(id: number): void{
    const dialogRef = this.dialog.open(PriceFormModalComponent, {
      data: {
        id
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      //
    });
  }

  save(): void {
    this.productForm?.get('name')?.markAsDirty();
    this.productForm?.markAllAsTouched();
    this.presentations.controls.forEach((presentation: any) => {
      presentation.get('name').markAsDirty();
      presentation.get('amount').markAsDirty();
    });
    this.presentations.markAllAsTouched();
    if (!this.productForm?.valid) {
      return;
    }
    console.log(this.productForm);
  }

  cancel(): void {
    if (!this.productForm?.pristine || !this.presentations?.pristine) {
      this.swalService.confirm(
        '¿Quiere abondonar el formulario?',
        'Los cambios en producto / presentaciones no fueron guardados y se perderán.',
        'Si', 'No').then((result: any) => {
          if (result.isConfirmed) {
            this.router.navigate(['/productos']);
          }
      });
    } else {
      this.router.navigate(['/productos']);
    }
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
