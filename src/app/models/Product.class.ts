import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Presentation } from './Presentation.class';

export class Product {
  id: number;
  name: string;
  description: string;
  // tslint:disable-next-line: variable-name
  sell_type: number;
  origin: string;
  // tslint:disable-next-line: variable-name
  user_id: number;
  active: number;
  presentations: Presentation[];
  photos: string[];

  constructor(product?: Product) {
    this.id = (product) ? product.id : 0;
    this.name = (product) ? product.name : '';
    this.description = (product) ? product.description : '';
    this.sell_type = (product) ? product.sell_type : 0;
    this.origin = (product) ? product.origin : '';
    this.user_id = (product) ? product.user_id : 0;
    this.active = 1;
    if (product && product.presentations) {
      this.presentations = product.presentations.map(p => new Presentation(p));
    } else {
      this.presentations = [];
    }
    this.photos = (product) ? product.photos : [];
  }

  getState(): string {
    return (this.active) ? 'Activo' : 'Inactivo';
  }

  stateCss(): string {
    return (this.active) ? 'p-active' : 'p-inactive';
  }

  getSellType(): string {
    return (this.sell_type === 0) ? 'Fraccionado' : 'Envase';
  }

  toForm(): FormGroup {
    const presentations = new FormArray([]);
    this.presentations.forEach(p => {
      presentations.push(new FormGroup({
        id: new FormControl(p.id),
        name: new FormControl(p.name, [Validators.required]),
        amount: new FormControl(p.amount, [Validators.required]),
        description: new FormControl(p.description),
        price: new FormControl(p.price.price),
        active: new FormControl(p.active),
      }));
    });
    return new FormGroup({
      id: new FormControl(this.id),
      name: new FormControl(this.name, [Validators.required]),
      description: new FormControl(this.description),
      sell_type: new FormControl(this.sell_type, [Validators.required]),
      origin: new FormControl(this.origin),
      active: new FormControl(this.active),
      presentations
    });
  }
}
