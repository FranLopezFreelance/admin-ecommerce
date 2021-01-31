import { Component, Input, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { ProductsService } from 'src/app/core/services/products.service';
import { Product } from 'src/app/models/Product.class';
import { includesWithoutAccentsAndCase } from 'src/app/shared/helpers/strings.helpers';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styles: [
  ]
})
export class ProductsListComponent implements OnInit {

  @Input() products?: Product[];
  filterValue: string | any;
  filteredProducts?: Product[];
  tableNodes: any[];
  allOpen = true;
  @BlockUI() blockUI?: NgBlockUI;

  constructor(
    private productsService: ProductsService,
    private toastr: ToastrService
  ) {
    this.tableNodes = [];
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.blockUI?.start();
    this.productsService.getProducts().subscribe((products: Product[]) => {
      this.products = products;
      this.setTableNodes(this.products.length);
      this.filteredProducts = this.products;
      this.blockUI?.stop();
    }, () => {
      this.blockUI?.stop();
      this.toastr.error('Error en la carga de datos');
    });
  }

  filter(): void {
    if (this.filterValue.length) {
      this.filteredProducts = this.products?.filter(p =>
        includesWithoutAccentsAndCase(p.name, this.filterValue)
      );
    } else {
      this.filteredProducts = this.products;
    }
  }

  private setTableNodes(q: number | any): void {
    for (let i = 0; i < q; i++) {
      this.tableNodes.push({open: this.allOpen});
    }
  }

  changeNodeState(i: number): void {
    this.tableNodes[i].open = !this.tableNodes[i].open;
  }

  changeNodeStates(): void {
    this.allOpen = !this.allOpen;
    this.tableNodes.forEach(tn => tn.open = this.allOpen);
  }

}
