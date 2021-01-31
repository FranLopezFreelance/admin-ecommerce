import { FormControl, FormGroup, Validators } from '@angular/forms';

export class Presentation {
  id: number;
  // tslint:disable-next-line: variable-name
  product_id: number;
  name: string;
  amount: number;
  // tslint:disable-next-line: variable-name
  unity_id: number;
  description: string;
  unity: Unity;
  images?: File[];
  prices: Price[];
  // tslint:disable-next-line: variable-name
  user_id: number;

  constructor(presentation?: Presentation) {
    this.id = (presentation) ? presentation.id : 0;
    this.product_id = (presentation) ? presentation.product_id : 0;
    this.name = (presentation) ? presentation.name : '';
    this.amount = (presentation) ? presentation.amount : 0;
    this.unity_id = (presentation) ? presentation.unity_id : 0;
    this.unity = (presentation) ? presentation.unity : {};
    this.description = (presentation) ? presentation.description : '';
    this.prices = (presentation) ? presentation.prices : [];
    this.user_id = (presentation) ? presentation.user_id : 0;
  }

  toForm(): FormGroup {
    return new FormGroup({
      id: new FormControl(this.id),
      product_id: new FormControl(this.product_id, [Validators.required]),
      amount: new FormControl(this.amount, [Validators.required]),
      unity_id: new FormControl(this.unity_id, [Validators.required]),
      description: new FormControl(this.description),
      user_id: new FormControl(this.user_id, [Validators.required])
    });
  }

  getName(): string {
    return `${this.amount} ${this.unity.name}`;
  }

  getPrice(): number {
    return (this.prices) ? this.prices[0].price : 0;
  }
}

export interface Unity {
  abbr?: string;
  name?: string;
}

export interface Price {
  id: number;
  price: number;
  date: string;
  // tslint:disable-next-line: variable-name
  user_id: number;
}
