import { FormControl, FormGroup, Validators } from '@angular/forms';

export class Presentation {
  id: number;
  // tslint:disable-next-line: variable-name
  product_id: number;
  name: string;
  amount: number;
  // tslint:disable-next-line: variable-name
  description: string;
  active: number;
  // tslint:disable-next-line: variable-name
  user_id: number;
  price: Price;

  constructor(presentation?: Presentation) {
    this.id = (presentation) ? presentation.id : 0;
    this.product_id = (presentation) ? presentation.product_id : 0;
    this.name = (presentation) ? presentation.name : '';
    this.amount = (presentation) ? presentation.amount : 0;
    this.description = (presentation) ? presentation.description : '';
    this.active = (presentation) ? presentation.active : 1;
    this.price = (presentation) ? presentation.price : defaultPrice;
    this.user_id = (presentation) ? presentation.user_id : 0;
  }

  toForm(): FormGroup {
    return new FormGroup({
      id: new FormControl(this.id),
      product_id: new FormControl(this.product_id),
      name: new FormControl(this.name, [Validators.required]),
      amount: new FormControl(this.amount, [Validators.required]),
      description: new FormControl(this.description),
      price: new FormControl(this.price),
      active: new FormControl(this.active),
    });
  }

  getState(): string {
    return (this.active) ? 'Activa' : 'Inactiva';
  }

  stateCss(): string {
    return (this.active) ? 'p-active' : 'p-inactive';
  }

  getPrice(): number {
    return this.price?.price || 0;
  }
}

export interface Price {
  presentation_id: number | null;
  price: number;
}

export const defaultPrice = {
  presentation_id: null,
  price: 0
};
