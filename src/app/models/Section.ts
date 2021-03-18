import { FormControl, FormGroup, Validators } from '@angular/forms';

export class Section {
  id: number | null;
  name: string;
  url: string;
  active: number;
  order: number;
  children: Section[];

  constructor(section?: Section) {
    this.id = section ? section.id : null;
    this.name = section ? section.name : '';
    this.name = section ? section.name : '';
    this.url = section ? section.url : '';
    this.active = section ? section.active : 1;
    this.order = section ? section.order : 0;
    this.children = section ? section.children?.map((s) => new Section(s)) : [];
  }

  toForm(): FormGroup {
    return new FormGroup({
      id: new FormControl(this.id),
      name: new FormControl(this.name, [Validators.required]),
      url: new FormControl(this.url, [Validators.required]),
      active: new FormControl(this.active),
      order: new FormControl(this.order),
    });
  }

  getState(): string {
    return this.active ? 'Activo' : 'Inactivo';
  }

  stateCss(): string {
    return this.active ? 's-active' : 's-inactive';
  }
}
