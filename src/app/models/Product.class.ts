import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Presentation } from './Presentation.class';

export class Product {
  id?: number;
  name?: string;
  description?: string;
  // tslint:disable-next-line: variable-name
  stock_gral?: number;
  origin: string;
  presentations?: Presentation[];
  // tslint:disable-next-line: variable-name
  active?: number;
  // tslint:disable-next-line: variable-name
  user_id?: number;

  constructor(product?: Product) {
    this.id = (product) ? product.id : 0;
    this.name = (product) ? product.name : '';
    this.description = (product) ? product.description : '';
    this.stock_gral = (product) ? product.stock_gral : 0;
    this.origin = (product) ? product.origin : '';
    this.user_id = (product) ? product.user_id : 0;
    this.active = 1;
    if (product && product.presentations) {
      this.presentations = product.presentations.map(p => new Presentation(p));
    }
  }

  getStockType(): string {
    return (this.stock_gral) ? 'Si' : 'No';
  }

  getState(): string {
    return (this.active) ? 'Activo' : 'Inactivo';
  }

  stateCss(): string {
    return (this.active) ? 'product-active' : 'product-inactive';
  }

  toForm(): FormGroup {
    return new FormGroup({
      id: new FormControl(this.id),
      name: new FormControl(this.name, [Validators.required]),
      description: new FormControl(this.description, ),
      descstock_gral: new FormControl(this.stock_gral, [Validators.required]),
      origin: new FormControl(this.origin),
      user_id: new FormControl(this.user_id, [Validators.required])
    });
  }
}

