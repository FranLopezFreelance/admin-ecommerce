import { FormControl, FormGroup } from '@angular/forms';

export class Section {
  id: number | null;
  name?: string;
  url?: string;
  active?: number;
  order?: number;
  children?: Section[];

  constructor(section: Section) {
    this.id = section.id || null;
    this.name = section.name || '';
    this.name = section.name || '';
    this.url = section.url || '';
    this.active = section.active || 1;
    this.order = section.order || 0;
    this.children = section.children?.map(s => new Section(s)) || [];
  }

  toForm(): FormGroup {
    return new FormGroup({
      id: new FormControl(this.id),
      name: new FormControl(this.name),
      url: new FormControl(this.url),
      active: new FormControl(this.active),
      order: new FormControl(this.order)
    });
  }

}
