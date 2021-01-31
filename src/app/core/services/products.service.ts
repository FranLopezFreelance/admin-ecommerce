import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/Product.class';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private http: HttpClient
  ) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('https://dawam.sanitapp.com.ar/api/products').pipe(
      map((product: Product[]) => {
        return product.map(( p: Product) => new Product(p));
      })
    );
  }
}
