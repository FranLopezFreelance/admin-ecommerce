export class ProductSection {
  id: string;
  name?: string;

  constructor(section: ProductSection) {
    this.id = String(section.id);
    this.name = section.name || '';
  }
}
