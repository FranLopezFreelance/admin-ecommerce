import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { ProductsService } from 'src/app/core/services/products.service';
import { Presentation, Price } from 'src/app/models/Presentation.class';

@Component({
  selector: 'app-price-form-modal',
  templateUrl: './price-form-modal.component.html'
})
export class PriceFormModalComponent implements OnInit {

  newPrice = 0;
  presentation: Presentation;
  prices: Price[] = [];

  @BlockUI() blockUI?: NgBlockUI;

  constructor(
    public dialogRef: MatDialogRef<PriceFormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PriceDialogData,
    private productsService: ProductsService,
    private toastr: ToastrService,
  ) {
    this.presentation = this.data.control.value;
    if (this.presentation.price.price) {
      this.newPrice = this.presentation.price.price;
    }
  }

  ngOnInit(): void {
    if (this.presentation.id) {
      this.getPrices();
    }
  }

  confirm(): void {
    const newPriceObj = {
      presentation_id: this.presentation.id,
      price: this.newPrice,
      user_id: 1
    };
    if (this.presentation.id) {
      this.blockUI?.start();
      this.productsService.createPrice(newPriceObj).subscribe(() => {
        this.blockUI?.stop();
        this.toastr.success('El Precio se actualizó correctamente.');
        this.data.control.get('price')?.setValue(newPriceObj);
        this.dialogRef.close();
      }, () => {
        this.blockUI?.stop();
        this.toastr.error('Ha ocurrido un error al intentar guardar el pecio.');
      });
    } else {
      this.data.control.get('price')?.setValue(newPriceObj);
      this.dialogRef.close();
    }
  }

  private getPrices(): void {
    this.blockUI?.start();
    this.productsService.getPrices(this.presentation.id)
      .subscribe((prices: Price[]) => {
        this.blockUI?.stop();
        this.prices = prices;
      }, () => {
        this.toastr.error('Ha ocurrido un error al intentar recuperar el histórico de precios.');
        this.blockUI?.stop();
      });
  }

  deletePrice(id: number): void {
    //
  }

  close(): void {
    this.dialogRef.close();
  }

}

export type PriceDialogData = {
  control: FormControl,
};
