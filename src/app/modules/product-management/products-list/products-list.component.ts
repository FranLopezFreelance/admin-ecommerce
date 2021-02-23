import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { EventsService } from 'src/app/core/services/events.service';
import { ProductsService } from 'src/app/core/services/products.service';
import { SwalService } from 'src/app/core/services/swal.service';
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
    private eventsService: EventsService,
    private toastr: ToastrService,
    private router: Router,
    private swalService: SwalService
  ) {  }

  ngOnInit(): void {
    this.getProducts();
    this.eventsService.deleteProduct.subscribe((id: number) => {
      this.deleteProduct(id);
    });
  }

  getProducts(): void {
    this.blockUI?.start();
    this.productsService.getProducts().subscribe((products: Product[]) => {
      this.products = products;
      this.filteredProducts = this.products;
      this.blockUI?.stop();
    }, () => {
      this.blockUI?.stop();
      this.toastr.error('Ha ocurrido un error en la carga de datos.');
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

  deleteProduct(id: number): void {
    this.swalService.confirm(
      '¿Seguro que quiere eliminar el producto?',
      'Una vez que confirme la acción, el producto se eliminará definitivamente.',
      'Si', 'No').then((result: any) => {
        if (result.isConfirmed) {
          this.blockUI?.start();
          this.productsService.deleteProduct(id).subscribe(() => {
            this.toastr.success('El producto se eliminó correctamente.');
            this.blockUI?.stop();
            this.getProducts();
          }, () => {
            this.toastr.success('Ha ocurrido un error al intentar eliminar el producto.');
            this.blockUI?.stop();
          });
        }
    });
  }
}
