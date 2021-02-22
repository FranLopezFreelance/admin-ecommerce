import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Product } from 'src/app/models/Product.class';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html'
})
export class ProductsTableComponent implements OnInit, OnChanges {

  @Input() products: Product[] = [];
  tableNodes: any[] = [];
  allOpen = true;

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.setTableNodes(this.products.length, this.allOpen);
  }

  ngOnChanges(changes: SimpleChanges): void{
    const products = changes.products;
    if (products && products.currentValue) {
      this.setTableNodes(this.products.length, this.allOpen);
    }
  }

  changeNodeState(i: number): void {
    this.tableNodes[i].open = !this.tableNodes[i].open;
  }

  changeNodeStates(): void {
    this.allOpen = !this.allOpen;
    this.tableNodes.forEach(tn => tn.open = this.allOpen);
  }

  private setTableNodes(q: number | any, allOpen: boolean): void {
    for (let i = 0; i < q; i++) {
      this.tableNodes.push({open: allOpen});
    }
  }

}
