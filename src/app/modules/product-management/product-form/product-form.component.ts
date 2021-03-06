import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { ProductsService } from 'src/app/core/services/products.service';
import { SectionsService } from 'src/app/core/services/sections.service';
import { SwalService } from 'src/app/core/services/swal.service';
import { Presentation } from 'src/app/models/Presentation.class';
import { Product } from 'src/app/models/Product.class';
import { Section } from 'src/app/models/Section';
import { PriceFormModalComponent } from '../price-form-modal/price-form-modal.component';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html'
})
export class ProductFormComponent implements OnInit {

  id?: string;
  product: Product = new Product();
  presentation: Presentation = new Presentation();
  productForm?: FormGroup;
  action?: string;
  sections: Section[] = [];

  @BlockUI() blockUI?: NgBlockUI;

  constructor(
    private productService: ProductsService,
    private sectionsService: SectionsService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private swalService: SwalService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getSections();
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id') || '';
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
    this.presentations.push(this.presentation.toForm());
    window.scrollTo(0, document.body.scrollHeight);
  }

  delPresentation(i: number, id: number): void {
    if (id) {
      this.swalService.confirm(
        '¿Seguro que quiere quitar la presentación?',
        'Una vez que guarde los cambios en el formulario, la presntación se eliminará definitivamente.',
        'Si', 'No').then((result: any) => {
          if (result.isConfirmed) {
            this.presentations.removeAt(i);
            this.presentations.markAsDirty();
          }
      });
    } else {
      this.presentations.removeAt(i);
      this.presentations.markAsDirty();
    }
  }

  openPriceFormModal(control: AbstractControl): void{
    this.dialog.open(PriceFormModalComponent, {
      data: {control}
    });
  }

  save(): void {
    this.prepareForm();
    if (!this.productForm?.valid) {
      return;
    }
    if (this.id !== 'nuevo') {
      this.update();
    } else {
      this.create();
    }
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

  private getSections(): void {
    this.sectionsService.getSections().subscribe(sections => {
      this.sections = sections;
    });
  }

  private getProduct(): void {
    this.blockUI?.start();
    this.productService.getProduct(Number(this.id)).subscribe(product => {
      this.product = product;
      this.productForm = this.product.toForm();
      this.blockUI?.stop();
    });
  }

  private prepareForm(): void {
    this.productForm?.get('name')?.markAsDirty();
    this.productForm?.markAllAsTouched();
    this.presentations.controls.forEach((presentation: any) => {
      presentation.get('name').markAsDirty();
      presentation.get('amount').markAsDirty();
    });
    this.presentations.markAllAsTouched();
  }

  private update(): void {
    this.blockUI?.start();
    this.productService.updateProduct(this.id, this.buildRequestData()).subscribe(() => {
      this.blockUI?.stop();
      this.toastr.success('Los datos se editaron correctamente');
      this.router.navigate(['/productos']);
    }, () => {
      this.blockUI?.stop();
      this.toastr.error('Ha ocurrido un error');
    });
  }

  private create(): void {
    this.blockUI?.start();
    this.productService.createProduct(this.buildRequestData()).subscribe(() => {
      this.blockUI?.stop();
      this.toastr.success('Los datos se guardaron correctamente');
      this.router.navigate(['/productos']);
    }, () => {
      this.blockUI?.stop();
      this.toastr.error('Ha ocurrido un error');
    });
  }

  private buildRequestData(): Product {
    const data: Product = this.productForm?.value;
    const sections: any[] = [];
    data.active = Number(data.active);
    data.presentations.map(pres => pres.active = Number(pres.active));
    this.productForm?.value.sections.forEach((s: any) => {
      sections.push({ id: Number(s) });
    });
    data.sections = sections;
    return data;
  }

}
