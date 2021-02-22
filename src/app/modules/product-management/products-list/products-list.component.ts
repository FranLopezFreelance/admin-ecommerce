import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { ProductsService } from 'src/app/core/services/products.service';
import { Product } from 'src/app/models/Product.class';
import { includesWithoutAccentsAndCase } from 'src/app/shared/helpers/strings.helpers';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
})
export class ProductsListComponent implements OnInit {

  @Input() products?: Product[];
  filterValue: string | any;
  filteredProducts?: Product[];

  @BlockUI() blockUI?: NgBlockUI;

  constructor(
    private productsService: ProductsService,
    private toastr: ToastrService,
    private router: Router,
  ) {  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.blockUI?.start();
    this.productsService.getProducts().subscribe((products: Product[]) => {
      this.products = products;
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

  createProduct(): void {
    this.router.navigate(['/productos/nuevo']);
  }
}
