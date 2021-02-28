import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Presentation } from './Presentation.class';
import { ProductSection } from './ProductSection.class';
import { Section } from './Section';

export class Product {
  id: number | null;
  name: string;
  description: string;
  // tslint:disable-next-line: variable-name
  sell_type: number;
  origin: string;
  // tslint:disable-next-line: variable-name
  user_id: number;
  active: number;
  presentations: Presentation[];
  sections: ProductSection[];
  photos: string[];

  constructor(product?: Product) {
    this.id = (product) ? product.id : null;
    this.name = (product) ? product.name : '';
    this.description = (product) ? product.description : '';
    this.sell_type = (product) ? product.sell_type : 0;
    this.origin = (product) ? product.origin : '';
    this.user_id = (product) ? product.user_id : 0;
    this.active = (product) ? product.active : 1;
    this.photos = (product) ? product.photos : [];

    if (product && product.presentations) {
      this.presentations = product.presentations.map(p => new Presentation(p));
    } else {
      this.presentations = [];
    }

    if (product && product.sections) {
      const sections: ProductSection[] = [];
      product.sections.forEach((s: any) => {
        sections.push(new ProductSection(s));
      });
      this.sections = sections;
    } else {
      this.sections = [];
    }
  }

  getState(): string {
    return (this.active) ? 'Activo' : 'Inactivo';
  }

  stateCss(): string {
    return (this.active) ? 'p-active' : 'p-inactive';
  }

  getSection(): string {
    if (this.sections.length) {
      let sections = '';
      this.sections.forEach(s => sections += `${s.name}, `);
      return sections.slice(0, -2);
    } else {
      return 'Sin sección';
    }
  }

  getSellType(): string {
    return (this.sell_type === 0) ? 'Fraccionado' : 'Envase';
  }

  toForm(): FormGroup {
    const presentations = new FormArray([]);
    this.presentations.forEach(pres => {
      presentations.push(pres.toForm());
    });

    return new FormGroup({
      id: new FormControl(this.id),
      name: new FormControl(this.name, [Validators.required]),
      description: new FormControl(this.description),
      sell_type: new FormControl(this.sell_type, [Validators.required]),
      origin: new FormControl(this.origin),
      active: new FormControl(this.active),
      sections: new FormControl(this.sections.map(s => Number(s.id))),
      presentations
    });
  }
}
